import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Switch, Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import EmptyState from '../../components/states/EmptyState';
import ErrorState from '../../components/states/ErrorState';
import LoadingState from '../../components/states/LoadingState';
import UiButton from '../../components/ui/UiButton';
import UiInput from '../../components/ui/UiInput';
import UiModal from '../../components/ui/UiModal';
import UiSelect from '../../components/ui/UiSelect';
import UiToast from '../../components/ui/UiToast';
import { ConfigFormState } from '../../data/models';
import { useConfigQuery } from '../../hooks/useConfigQuery';
import { setSimulateError, useSimulateError } from '../../hooks/useSimulateError';

interface FormState {
  siteName: string;
  language: ConfigFormState['language'];
  refreshInterval: string;
  enableAlerts: boolean;
  threshold: string;
}

type FormErrors = Partial<Record<'siteName' | 'refreshInterval' | 'threshold', string>>;

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Română', value: 'ro' },
  { label: 'Deutsch', value: 'de' }
];

const toFormState = (config: ConfigFormState): FormState => ({
  siteName: config.siteName,
  language: config.language,
  refreshInterval: String(config.refreshInterval),
  enableAlerts: config.enableAlerts,
  threshold: String(config.threshold)
});

const validateForm = (form: FormState) => {
  const errors: FormErrors = {};
  const trimmedName = form.siteName.trim();

  if (trimmedName.length < 3) {
    errors.siteName = 'Site name must be at least 3 characters.';
  }

  const refreshValue = Number(form.refreshInterval);
  if (form.refreshInterval.trim() === '' || Number.isNaN(refreshValue)) {
    errors.refreshInterval = 'Enter a numeric refresh interval.';
  } else if (refreshValue < 5 || refreshValue > 300) {
    errors.refreshInterval = 'Refresh interval must be between 5 and 300 seconds.';
  }

  const thresholdValue = Number(form.threshold);
  if (form.threshold.trim() === '' || Number.isNaN(thresholdValue)) {
    errors.threshold = 'Enter a numeric threshold.';
  } else if (thresholdValue < 0 || thresholdValue > 100) {
    errors.threshold = 'Threshold must be between 0 and 100.';
  }

  if (Object.keys(errors).length) {
    return { errors } as const;
  }

  const config: ConfigFormState = {
    siteName: trimmedName,
    language: form.language,
    refreshInterval: refreshValue,
    enableAlerts: form.enableAlerts,
    threshold: thresholdValue
  };

  return { errors, config } as const;
};

const ConfigurationScreen = () => {
  const { data: config, isLoading, isError, refetch } = useConfigQuery();
  const simulateError = useSimulateError();

  const [form, setForm] = useState<FormState | null>(null);
  const [initialForm, setInitialForm] = useState<FormState | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toastVisible, setToastVisible] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    if (config) {
      const next = toFormState(config);
      setForm(next);
      setInitialForm(next);
      setErrors({});
    }
  }, [config]);

  const hasChanges = useMemo(() => {
    if (!form || !initialForm) {
      return false;
    }
    return JSON.stringify(form) !== JSON.stringify(initialForm);
  }, [form, initialForm]);

  if (isLoading || !form) {
    return <LoadingState title="Loading configuration" message="Syncing configuration settings." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Configuration unavailable"
        message="We couldn't load the latest configuration."
        onRetry={() => refetch()}
      />
    );
  }

  if (!config) {
    return <EmptyState title="No configuration" message="Configuration data is not available yet." onRetry={refetch} />;
  }

  const updateForm = <T extends keyof FormState>(key: T, value: FormState[T]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = () => {
    if (!form) {
      return;
    }

    const result = validateForm(form);
    setErrors(result.errors);

    if (!result.config) {
      return;
    }

    const normalized = toFormState(result.config);
    setForm(normalized);
    setInitialForm(normalized);
    setToastVisible(true);
  };

  const handleCancel = () => {
    if (!hasChanges || !initialForm) {
      if (initialForm) {
        setForm(initialForm);
      }
      setErrors({});
      return;
    }
    setShowCancelModal(true);
  };

  const confirmReset = () => {
    if (initialForm) {
      setForm(initialForm);
    }
    setErrors({});
    setShowCancelModal(false);
  };

  return (
    <ScreenContainer>
      <Card>
        <Card.Title title="Site configuration" subtitle="Control branding and refresh policies" />
        <Card.Content>
          <View style={styles.fieldGroup}>
            <UiInput
              label="Site name"
              value={form.siteName}
              onChangeText={(text) => updateForm('siteName', text)}
              testID="config-site-name"
              accessibilityLabel="Site name input"
            />
            {errors.siteName ? (
              <Text variant="bodySmall" style={styles.errorText}>
                {errors.siteName}
              </Text>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            <UiSelect
              label="Language"
              options={languageOptions}
              selectedValue={form.language}
              onSelect={(value) => updateForm('language', value)}
              testID="config-language"
              accessibilityLabel="Select interface language"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.flexItem}>
              <UiInput
                label="Refresh interval (seconds)"
                value={form.refreshInterval}
                onChangeText={(text) => updateForm('refreshInterval', text)}
                keyboardType="numeric"
                testID="config-refresh"
                accessibilityLabel="Refresh interval input"
              />
              {errors.refreshInterval ? (
                <Text variant="bodySmall" style={styles.errorText}>
                  {errors.refreshInterval}
                </Text>
              ) : null}
            </View>
            <View style={styles.flexItem}>
              <UiInput
                label="Alert threshold"
                value={form.threshold}
                onChangeText={(text) => updateForm('threshold', text)}
                keyboardType="numeric"
                testID="config-threshold"
                accessibilityLabel="Alert threshold input"
              />
              {errors.threshold ? (
                <Text variant="bodySmall" style={styles.errorText}>
                  {errors.threshold}
                </Text>
              ) : null}
            </View>
          </View>

          <View style={styles.switchRow}>
            <View>
              <Text variant="titleMedium">Enable alerts</Text>
              <Text variant="bodyMedium" style={styles.description}>
                Receive push and email alerts for incidents.
              </Text>
            </View>
            <Switch
              value={form.enableAlerts}
              onValueChange={(value) => updateForm('enableAlerts', value)}
              testID="config-enable-alerts"
              accessibilityLabel="Toggle alerts"
            />
          </View>
        </Card.Content>
      </Card>

      <View style={styles.actionsRow}>
        <UiButton
          label="Cancel"
          mode="outlined"
          onPress={handleCancel}
          disabled={!form}
          testID="config-cancel"
        />
        <UiButton label="Save changes" onPress={handleSave} testID="config-save" />
      </View>

      <Card>
        <Card.Title title="Developer settings" subtitle="Debug mock APIs" />
        <Card.Content>
          <View style={styles.switchRow}>
            <View>
              <Text variant="titleMedium">Simulate Error</Text>
              <Text variant="bodyMedium" style={styles.description}>
                Forces query hooks to throw demo errors.
              </Text>
            </View>
            <Switch
              value={simulateError}
              onValueChange={setSimulateError}
              testID="simulate-error-switch"
              accessibilityLabel="Toggle simulated error"
            />
          </View>
        </Card.Content>
      </Card>

      <UiModal
        visible={showCancelModal}
        onDismiss={() => setShowCancelModal(false)}
        testID="config-cancel-modal"
        showCloseButton
        closeAccessibilityLabel="Close discard changes modal"
      >
        <View style={styles.modalContent}>
          <Text variant="titleMedium">Discard changes?</Text>
          <Text variant="bodyMedium">This will reset all fields to the last saved configuration.</Text>
          <View style={styles.modalActions}>
            <UiButton label="Keep editing" mode="outlined" onPress={() => setShowCancelModal(false)} />
            <UiButton label="Discard" onPress={confirmReset} testID="config-confirm-reset" />
          </View>
        </View>
      </UiModal>

      <UiToast
        visible={toastVisible}
        message="Configuration saved successfully"
        onDismiss={() => setToastVisible(false)}
        duration={2500}
        testID="config-save-toast"
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12
  },
  flexItem: {
    flex: 1
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12
  },
  description: {
    color: '#4E5D78'
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12
  },
  errorText: {
    color: '#B00020',
    marginTop: 4
  },
  modalContent: {
    gap: 12
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12
  }
});

export default ConfigurationScreen;
