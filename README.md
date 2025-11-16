# Glimmora Hotel Design System

A comprehensive, production-ready design system for the Glimmora Hotel booking website built with React, TypeScript, and Vite.

## Features

- **Complete Design System**: Consistent design tokens, colors, typography, spacing, and more
- **TypeScript Support**: Fully typed components for better developer experience
- **CSS Modules**: Scoped styling for all components
- **Responsive Design**: Mobile-first approach with breakpoint system
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Production Ready**: Optimized for performance and scalability

## Design Tokens

### Colors
- Primary palette with main, dark, and light variants
- Comprehensive neutral scale (50-900)
- Semantic colors for success, warning, error, and info states
- Background and border color system

### Typography
- Modular font size scale (xs to 5xl)
- Consistent line heights
- Font weight variants (regular, medium, semibold, bold)
- System font stack for optimal performance

### Spacing
- 8px grid system for consistent spacing
- Spacing scale from 1 (4px) to 20 (80px)

### Components

#### Core UI Components
- **Button**: Primary, secondary, and ghost variants with loading states
- **Input**: Text inputs with labels, errors, icons, and validation
- **Card**: Flexible card component with header, body, and footer
- **Badge**: Status indicators with multiple variants
- **Avatar**: User avatars with fallback support and grouping
- **Spinner**: Loading indicators with overlay support
- **Checkbox**: Styled checkboxes with indeterminate state
- **Divider**: Horizontal and vertical dividers with variants

#### Typography Components
- **Typography**: Flexible text component with variants
- **Heading**: Semantic heading components (h1-h6)
- **Text**: Body text component
- **Caption**: Small text for captions
- **Overline**: Uppercase text for labels

#### Layout Components
- **Container**: Centered container with max-width variants
- **Grid**: CSS Grid layout with responsive columns
- **Flex**: Flexbox layout with alignment and spacing
- **Stack**: Vertical flex layout for stacking elements
- **Spacer**: Spacing component for adding gaps

#### Form Components
- **Form**: Form wrapper component
- **FormField**: Field wrapper with label and error support
- **FormLabel**: Consistent form labels
- **FormError**: Error message display
- **FormHelperText**: Helper text for inputs
- **FormGroup**: Group multiple form fields

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Usage

### Importing Components

```typescript
import { Button, Input, Card } from './components/ui';
```

### Using Design Tokens

```typescript
import { colors, typography, spacing } from './styles/tokens';

// Use in JavaScript
const primaryColor = colors.primary.main;

// Use in CSS
.element {
  color: var(--primary-main);
  padding: var(--space-4);
  font-size: var(--fs-base);
}
```

### Example Component

```tsx
import { Button, Card, Input, Stack } from './components/ui';

function BookingForm() {
  return (
    <Card>
      <Stack spacing={4}>
        <Input
          label="Full Name"
          placeholder="Enter your name"
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
        />
        <Button variant="primary" fullWidth>
          Book Now
        </Button>
      </Stack>
    </Card>
  );
}
```

## Component Documentation

### Button

```tsx
<Button
  variant="primary" // primary | secondary | ghost
  size="default"    // small | default | large
  fullWidth={false}
  isLoading={false}
  leftIcon={<Icon />}
  rightIcon={<Icon />}
>
  Click Me
</Button>
```

### Input

```tsx
<Input
  label="Email"
  error="Invalid email"
  helperText="We'll never share your email"
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  fullWidth
  required
/>
```

### Card

```tsx
<Card variant="elevated" hoverable padding="medium">
  <CardHeader>
    <Typography variant="h4">Title</Typography>
  </CardHeader>
  <CardBody>
    Content goes here
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Design System Structure

```
src/
├── styles/
│   ├── design-system.css    # CSS variables
│   ├── tokens.ts            # TypeScript constants
│   └── global.css           # Global styles
├── components/
│   └── ui/
│       ├── Button/
│       ├── Input/
│       ├── Card/
│       ├── Badge/
│       ├── Avatar/
│       ├── Spinner/
│       ├── Checkbox/
│       ├── Divider/
│       ├── Typography/
│       ├── Layout/
│       ├── Form/
│       └── index.ts         # Exports all components
└── App.tsx                  # Demo application
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
