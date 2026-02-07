import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

interface UiCardAction {
  label: string;
  onPress: () => void;
  icon?: IconSource;
}

interface UiCardProps {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  children?: ReactNode;
  actions?: UiCardAction[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const UiCard = ({ title, subtitle, onPress, children, actions = [], style, testID }: UiCardProps) => (
  <Card onPress={onPress} style={style} testID={testID}>
    {(title || subtitle) && <Card.Title title={title} subtitle={subtitle} />}
    {children ? <Card.Content>{children}</Card.Content> : null}
    {actions.length ? (
      <Card.Actions>
        {actions.map((action) => (
          <Button key={action.label} icon={action.icon} onPress={action.onPress}>
            {action.label}
          </Button>
        ))}
      </Card.Actions>
    ) : null}
  </Card>
);

export default UiCard;
