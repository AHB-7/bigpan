export const typography = {
  fonts: {
    montserrat: {
      thin: 'Montserrat-Thin', // 100 - decorative text
      extraLight: 'Montserrat-ExtraLight', // 200 - subtle captions
      light: 'Montserrat-Light', // 300 - body text, descriptions
      regular: 'Montserrat-Regular', // 400 - default body text
      medium: 'Montserrat-Medium', // 500 - emphasis, labels
      semiBold: 'Montserrat-SemiBold', // 600 - headings, important text
      bold: 'Montserrat-Bold', // 700 - titles, strong emphasis
      extraBold: 'Montserrat-ExtraBold', // 800 - large headers
      black: 'Montserrat-Black', // 900 - app name, hero text
    },
  },

  // BigPan typography scale
  scale: {
    // Display text (app name, hero sections)
    display: {
      fontSize: 40,
      fontFamily: 'Montserrat-Black',
    },

    // Large headings (screen titles)
    heading1: {
      fontSize: 32,
      fontFamily: 'Montserrat-ExtraBold',
    },

    // Section headings (recipe titles)
    heading2: {
      fontSize: 24,
      fontFamily: 'Montserrat-Bold',
    },

    // Sub-headings (ingredient groups, steps)
    heading3: {
      fontSize: 20,
      fontFamily: 'Montserrat-SemiBold',
    },

    // Card titles, labels
    heading4: {
      fontSize: 18,
      fontFamily: 'Montserrat-SemiBold',
    },

    // Body text (descriptions, instructions)
    body: {
      fontSize: 16,
      fontFamily: 'Montserrat-Regular',
    },

    // Small body text
    bodySmall: {
      fontSize: 14,
      fontFamily: 'Montserrat-Regular',
    },

    // Button text
    button: {
      fontSize: 16,
      fontFamily: 'Montserrat-SemiBold',
    },

    // Labels, form fields
    label: {
      fontSize: 14,
      fontFamily: 'Montserrat-Medium',
    },

    // Captions, metadata
    caption: {
      fontSize: 12,
      fontFamily: 'Montserrat-Light',
    },

    // Very small text
    tiny: {
      fontSize: 10,
      fontFamily: 'Montserrat-Light',
    },
  },
}
