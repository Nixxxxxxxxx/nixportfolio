# Project Rules

## Goal
Build a personal portfolio website with premium-quality frontend execution:
- layout that matches Figma closely;
- smooth, intentional animations;
- strong responsive behavior on mobile and desktop;
- clean, maintainable code;
- thoughtful product and visual improvements where they make the result stronger.

## Working Principles

### 1. Figma fidelity comes first
- Treat Figma as the source of truth for layout, spacing, typography, sizing, hierarchy, and component states.
- Do not silently replace the design with a generic landing-page solution.
- If the mockup is inconsistent or unclear, call that out explicitly before locking in a weak implementation.
- Small implementation deviations are acceptable only when they improve usability, responsiveness, accessibility, or performance.

### 2. Quality over speed
- Prefer robust, polished implementation over fast but fragile code.
- Avoid rushed visual shortcuts, magic numbers without reason, and brittle CSS that breaks on nearby screen sizes.
- If a section looks technically correct but visually weak, refine it instead of stopping at "done".

### 3. Animations must feel intentional
- Use animation to support hierarchy, focus, and perceived quality, not decoration for its own sake.
- Favor transform- and opacity-based motion for performance.
- Avoid over-animated interfaces, noisy looping effects, and trendy motion that harms readability.
- Keep timing consistent across the project.
- Respect `prefers-reduced-motion` and provide graceful fallbacks.

### 4. Responsive behavior is a first-class requirement
- Design and implement for mobile, tablet, and desktop from the start.
- Prevent horizontal scroll, broken wrapping, clipped text, and fragile absolute positioning.
- Preserve the feel of the design across breakpoints, not just the literal desktop composition.

### 5. Accessibility is mandatory
- Use semantic HTML and preserve logical heading structure.
- Ensure keyboard accessibility for navigation and interactive controls.
- Maintain strong color contrast unless the design explicitly requires a softer treatment and still remains readable.
- Add focus states, alt text, and accessible names where needed.
- Motion, hover behavior, and scroll effects must not block core content access.

### 6. Performance is part of design quality
- Prefer lightweight solutions before adding heavy dependencies.
- Optimize images, fonts, and animation strategy to keep the site fast.
- Avoid unnecessary re-renders, layout thrashing, and animation techniques that cause jank.
- Every visual effect should justify its runtime cost.

### 7. Code should stay clean and scalable
- Break UI into understandable, reusable components when it improves clarity.
- Keep styling structured and predictable.
- Use design tokens or CSS variables for colors, spacing, radii, shadows, and motion values once the system starts repeating.
- Write comments only where they meaningfully clarify non-obvious logic.
- Do not introduce complexity without a concrete payoff.

## Figma-to-Code Workflow
- Before implementation, inspect the relevant frame and identify:
  - spacing system;
  - typography scale;
  - colors and effects;
  - component states;
  - responsive intent;
  - animation clues implied by hierarchy and interaction.
- During implementation, preserve the visual rhythm of the mockup instead of copying isolated pixel values blindly.
- After implementation, compare result against the design and check:
  - overall composition;
  - spacing accuracy;
  - font size, weight, and line-height;
  - border radius, shadows, and strokes;
  - interaction states;
  - motion quality;
  - mobile adaptation.

## Improvement Policy
- Always separate two things clearly:
  - what is required to match Figma;
  - what is a recommended improvement beyond Figma.
- Propose improvements proactively when they can strengthen:
  - readability;
  - visual hierarchy;
  - usability;
  - accessibility;
  - responsiveness;
  - performance;
  - perceived polish.
- If a proposed improvement changes the original visual direction, pause and align before implementing it.

## Communication Rules
- Be direct, thoughtful, and critical when something in the design or implementation is weak.
- Do not agree with questionable decisions just to keep momentum.
- Explain tradeoffs simply and suggest the strongest path forward.
- When assumptions are needed, make reasonable ones and state them.

## Definition of Done
A section is not done until:
- it visually matches the approved design closely;
- animations feel smooth and consistent;
- it works on mobile and desktop without obvious breakage;
- accessibility basics are covered;
- there are no obvious console errors or broken states;
- the code is clean enough to extend without rewriting.

## Default Collaboration Mode For This Repo
- Prioritize implementation quality and honest critique over fast output.
- When given a Figma file or node, inspect it before building.
- When finishing a task, report both:
  - what was implemented;
  - what should still be improved, if anything.
