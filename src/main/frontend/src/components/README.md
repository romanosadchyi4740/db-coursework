# Popup Component

A reusable, accessible popup component with modern styling that matches the bookstore theme.

## Features

- **Multiple Types**: Success, Error, Warning, and Info popups with appropriate icons and colors
- **Keyboard Support**: Press Escape to close the popup
- **Accessibility**: Full ARIA support for screen readers
- **Auto-close**: Optional automatic closing with configurable delay
- **Responsive**: Works on all screen sizes
- **Customizable**: Flexible props for different use cases

## Usage

```jsx
import Popup from '../components/Popup';

// Basic usage
<Popup
  isOpen={showPopup}
  title="Success!"
  message="Your action was completed successfully."
  type="success"
  onClose={() => setShowPopup(false)}
/>

// With auto-close
<Popup
  isOpen={showPopup}
  title="Info"
  message="This popup will close automatically in 3 seconds."
  type="info"
  onClose={() => setShowPopup(false)}
  autoClose={true}
  autoCloseDelay={3000}
/>

// Error popup
<Popup
  isOpen={showError}
  title="Error"
  message="Something went wrong. Please try again."
  type="error"
  onClose={() => setShowError(false)}
/>
```

## Props

| Prop              | Type                                        | Default   | Description                             |
| ----------------- | ------------------------------------------- | --------- | --------------------------------------- |
| `isOpen`          | boolean                                     | -         | Controls popup visibility               |
| `onClose`         | function                                    | -         | Callback when popup is closed           |
| `title`           | string                                      | -         | Popup title                             |
| `message`         | string                                      | -         | Popup message content                   |
| `type`            | 'success' \| 'error' \| 'warning' \| 'info' | 'success' | Popup type with appropriate styling     |
| `showCloseButton` | boolean                                     | true      | Show/hide the close button              |
| `autoClose`       | boolean                                     | false     | Enable automatic closing                |
| `autoCloseDelay`  | number                                      | 3000      | Delay in milliseconds before auto-close |

## Types

- **Success**: Green gradient with checkmark icon
- **Error**: Red gradient with X icon
- **Warning**: Orange gradient with warning triangle icon
- **Info**: Brown gradient with info circle icon

## Accessibility

- Uses proper ARIA attributes (`role="dialog"`, `aria-modal`, etc.)
- Keyboard navigation support (Escape to close)
- Screen reader friendly with proper labels
- Focus management
- Body scroll lock when popup is open

## Styling

The popup uses the bookstore theme colors and includes:

- Smooth animations and transitions
- Backdrop blur effect
- Responsive design
- Modern shadow and border effects
- Consistent typography with the rest of the app
