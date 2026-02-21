# Specification

## Summary
**Goal:** Fix the Featured Products section to display all 18 products instead of only the original 6.

**Planned changes:**
- Debug and fix the FeaturedProducts component data fetching to retrieve and render all 18 products
- Verify the useQueries hook returns the complete array of 18 products without truncation
- Ensure the backend getFeaturedProducts method correctly returns all 18 entries from the featuredProducts map
- Remove any array slicing, limiting, or filtering logic that prevents all 18 products from rendering

**User-visible outcome:** Users will see all 18 featured products displayed in the Featured Products grid, including the 12 newly added products alongside the original 6.
