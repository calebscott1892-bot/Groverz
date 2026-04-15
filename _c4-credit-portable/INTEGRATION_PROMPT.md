# C4 Studios Animated Footer Credit — Integration Prompt

> Give this entire prompt to your other project's AI agent.

---

## TASK

Add the C4 Studios animated footer credit logo to the bottom of this website's footer. Two pre-built source files are provided — they must be used **exactly as-is**. Do NOT rewrite, regenerate, or "clean up" these files. They contain precision SVG path data and GSAP animation timelines that will break if any values are altered.

---

## STEP 1: Install Dependencies

```bash
npm install gsap @gsap/react
```

Requires **React 18+** (for `useId` hook), **GSAP 3.12+**, and **@gsap/react 2.1+**.

---

## STEP 2: Copy the Two Component Files

The user has provided two files. Copy them **verbatim** into your components directory (e.g., `src/components/c4-footer-credit/`):

1. **`c4WordmarkData.js`** — SVG morph path data for the "Studios" wordmark (7 letter pairs with upright + italic paths). **DO NOT MODIFY THIS FILE AT ALL.** Every decimal coordinate matters.

2. **`C4FooterCredit.jsx`** — The complete React component with GSAP animation. **DO NOT MODIFY THIS FILE** except to adjust the import path for `c4WordmarkData` if your directory structure differs.

The only acceptable edit to either file: changing the relative import path on line 4 of `C4FooterCredit.jsx` if needed:
```js
import { C4_WORDMARK_MORPH_PAIRS } from './c4WordmarkData';
```

---

## STEP 3: Add to Footer

Import and place the component in the site footer's bottom bar, near the copyright line.

### Recommended layout pattern:

```jsx
import C4FooterCredit from '@/components/c4-footer-credit/C4FooterCredit';

// In your footer's bottom section:
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <span style={{ fontSize: '10px', letterSpacing: '0.05em', opacity: 0.35 }}>
    Designed by
  </span>
  <C4FooterCredit
    href="https://c4studios.com"
    label="Designed by C4 Studios"
    size={36}
    showText={false}
    openInNewTab={true}
    colorScheme="dark"
  />
</div>
```

### Props reference:

| Prop | Type | Default | Notes |
|---|---|---|---|
| `href` | string | `'https://c4studios.com'` | Link destination |
| `label` | string | `'Designed by C4 Studios'` | aria-label text |
| `size` | number or `'small'`\|`'default'`\|`'large'`\|`'xl'` | `36` | Logo height in px |
| `showText` | boolean | `true` | Show label below logo |
| `openInNewTab` | boolean | `true` | target="_blank" |
| `colorScheme` | `'dark'`\|`'light'`\|`'auto'` | `'dark'` | **Use 'dark' for dark footers, 'light' for light footers** |
| `className` | string | `''` | Extra CSS classes |

---

## CRITICAL RULES

1. **DO NOT regenerate or rewrite the SVG path data.** The `c4WordmarkData.js` file contains pre-computed vector coordinates for morphing animations. Any rounding, reformatting, or rewriting will break the logo rendering.

2. **DO NOT simplify or refactor `C4FooterCredit.jsx`.** The GSAP timeline construction is precisely calibrated with exact timing values, spring physics constants, and clip-path sequences. It looks complex because it IS complex — leave it alone.

3. **DO NOT add `display: none`, `overflow: hidden`, or `height: 0`** to any parent container of this component. The SVG uses `overflow: visible` and needs to paint outside its bounding box for the animation.

4. **DO NOT wrap this in a container with CSS `transform` or `will-change: transform`**. GSAP's `svgOrigin` calculations can break in nested transform contexts.

5. If using **Next.js App Router**, the component must be in a Client Component (add `'use client'` at the top of the file that imports `C4FooterCredit`, or at the top of `C4FooterCredit.jsx` itself).

---

## TROUBLESHOOTING

**Logo doesn't appear at all:**
- Check browser console for import errors — `gsap` or `@gsap/react` may not be installed
- Verify the import path to `c4WordmarkData` is correct

**Logo appears but looks broken / shapes in wrong positions:**
- The SVG path data was modified. Replace both files with the originals byte-for-byte.
- Check for parent CSS `transform` properties interfering with SVG coordinate space

**Animation doesn't play on hover:**
- Ensure `prefers-reduced-motion` isn't active in your OS settings
- The component needs to be a client-side React component (not server-rendered)
- Check that GSAP is version 3.12+ and @gsap/react is 2.1+

**Logo renders tiny or invisible:**
- Make sure the `size` prop is reasonable (36 is default, try `size={48}` or `size="large"`)
- Check that no parent has `font-size: 0` or `line-height: 0` that might collapse the inline-flex container

**"getBBox is not a function" error:**
- This means the SVG element isn't in the DOM when GSAP initializes. Ensure the component is mounted client-side and not hidden by conditional rendering during the initial paint.
