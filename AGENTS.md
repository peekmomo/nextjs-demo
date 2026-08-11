<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Frontend Style Rules

When the user asks to modify, beautify, redesign, polish, or optimize page styles in this project, follow these rules.

## Workflow

1. Read the target page file first.
2. Read nearby components that affect the page, such as layout, navbar, cards, buttons, forms, and shared UI components.
3. Identify the styling system before editing. This project uses Next.js, Tailwind CSS, and shadcn-style UI components.
4. Preserve business logic, routes, data fetching, forms, validation, authentication, and API behavior.
5. Prefer Tailwind classes, existing shadcn components, and existing CSS variables in `app/globals.css`.
6. Avoid adding new dependencies unless the user explicitly asks or the change clearly requires it.
7. Keep the design responsive across mobile and desktop.
8. After editing, run lint or build when practical.
9. Summarize changed files and visual changes.

## Visual Preferences

- Prefer clean, modern, content-first layouts.
- Use clear spacing, readable typography, and obvious visual hierarchy.
- Keep colors restrained and consistent with the existing theme variables.
- Use cards only when they help organize repeated content or forms.
- Avoid overly decorative gradients, unnecessary animations, and unrelated visual effects.
- Make buttons, inputs, and navigation feel consistent across the app.

## Prompt Examples

If the user says:

> 帮我优化这个页面样式

Treat it as:

> Improve the visual design of the current page while preserving behavior. Use Tailwind, shadcn components, and this project's existing design tokens.

If the user says:

> 只改样式，不改逻辑

Do not change data fetching, API calls, route structure, form behavior, authentication logic, or database logic.