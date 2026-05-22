export const TEXT = {
  catalog: {
    noResults: "Sorry, nothing found for",
    tryAgainBtn: "Try Again",
  },
  search: {
    placeholder: "Search...",
  },
  pagination: {
    prev: "« Prev",
    next: "Next »",
  },
  navigation: {
    home: "Home",
    about: "About us",
  },
  theme: {
    light: "Light",
    dark: "Dark",
  },
  footer: {
    year: "2026",
    schoolName: "RS School",
    gitHubLabel: "GitHub Profile",
  },
  errorBoundary: {
    heading: "Something went wrong",
    fallbackMessage: "An unexpected error occurred",
  },
  card: {
    imageNotAvailable: "Image not available",
    author: "Author:",
    name: "Name:",
    year: "Year:",
    description: "Description:",
    unknown: "Unknown",
  },
  pages: {
    about: {
      title: "About the Project",
      museumHeading: "The Museum",
      museumText:
        "The Cleveland Museum of Art is one of the world's leading cultural institutions. Its permanent collection holds over 65,000 artworks spanning 6,000 years of history — from ancient Egyptian treasures to masterpieces by Monet, Van Gogh, and Picasso.",
      appHeading: "The Application",
      appTextPreLink:
        "This application was developed by a student as part of the educational program",
      courseLinkText: " RS School React Course ",
      appTextPostLink:
        ". Using The project successfully integrates recent and essential React development best practices. More information about the student can be found via the GitHub link below.",
      footerMessage:
        "I hope you enjoy exploring these incredible art pieces and this application!",
    },
    notFound: {
      heading: "404",
      subheading: "Page Not Found",
      message:
        "Oops! The page you're looking for doesn't exist or has been moved.",
      backLink: "← Back to Home",
    },
  },
} as const;

export const ERROR_MESSAGES = {
  INVALID_RESPONSE: "Invalid API response structure",
  UNEXPECTED: "An unexpected error occurred",
  API_NOT_FOUND: "API endpoint not found. Please try again later.",
  API_TOO_MANY: "Too many requests. Please wait a moment and try again.",
  API_SERVER_ERROR:
    "Server error. Our team has been notified. Please try again later.",
  API_FAILED: "Request failed with status:",
} as const;
