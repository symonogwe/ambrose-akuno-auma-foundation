/**
 * Scrolls to a section by its DOM id, offsetting for the fixed navbar.
 * Falls back gracefully if the element doesn't exist yet.
 */
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};
