export const scrollToSectionWithOffset = (targetId, offset = 0) => {
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  } else {
    console.warn(`Target element with ID "${targetId}" not found.`);
  }
}; 