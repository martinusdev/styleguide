if (sessionStorage.getItem('customFontLoaded2')) {
  document.documentElement.classList.add('fonts-loaded-2');
} else if ('fonts' in document) {
  const regularFont = new FontFace(
    'Tabac-Sans',
    `url('../fonts/Tabac-Sans/fonts/Tabac-Sans-Regular-9531409e5f6d548c2ccc3429d9d5db69.woff2') format('woff2'),
             url('../fonts/Tabac-Sans/fonts/Tabac-Sans-Regular-9531409e5f6d548c2ccc3429d9d5db69.woff') format('woff')`,
    {
      weight: 'normal',
      style: 'normal',
      display: 'swap',
    }
  );

  regularFont.load().then((loadedFont) => {
    document.fonts.add(loadedFont);
    document.documentElement.classList.add('fonts-loaded-1');
    sessionStorage.setItem('customFontLoaded1', 'true');

    const italicFont = new FontFace(
      'Tabac-Sans',
      `url('../fonts/Tabac-Sans/fonts/Tabac-Sans-Italic-939c7bc3092f331c10e75335f85f45a5.woff2') format('woff2'),
             url('../fonts/Tabac-Sans/fonts/Tabac-Sans-Italic-939c7bc3092f331c10e75335f85f45a5.woff') format('woff')`,
      {
        weight: 'normal',
        style: 'italic',
        display: 'swap',
      }
    );

    const semiboldFont = new FontFace(
      'Tabac-Sans',
      `url('../fonts/Tabac-Sans/fonts/Tabac-Sans-SemiBold-c1c5cd189c25eb46746c1d6648f58103.woff2') format('woff2'),
             url('../fonts/Tabac-Sans/fonts/Tabac-Sans-SemiBold-c1c5cd189c25eb46746c1d6648f58103.woff') format('woff')`,
      {
        weight: '600',
        style: 'normal',
        display: 'swap',
      }
    );

    const semiboldItalicFont = new FontFace(
      'Tabac-Sans',
      `url('../fonts/Tabac-Sans/fonts/Tabac-Sans-SemiBold-Italic-995d174f745ccf34d9668fc3949054e0.woff2') format('woff2'),
             url('../fonts/Tabac-Sans/fonts/Tabac-Sans-SemiBold-Italic-995d174f745ccf34d9668fc3949054e0.woff') format('woff')`,
      {
        weight: '600',
        style: 'italic',
        display: 'swap',
      }
    );

    const boldFont = new FontFace(
      'Tabac-Sans',
      `url('../fonts/Tabac-Sans/fonts/Tabac-Sans-Bold-0434c8d811e4abf9f73aab8061622b1a.woff2') format('woff2'),
             url('../fonts/Tabac-Sans/fonts/Tabac-Sans-Bold-0434c8d811e4abf9f73aab8061622b1a.woff') format('woff')`,
      {
        weight: '700',
        style: 'normal',
        display: 'swap',
      }
    );

    Promise.all([
      italicFont.load(),
      semiboldFont.load(),
      semiboldItalicFont.load(),
      boldFont.load()
    ]).then((loadedFonts) => {
      loadedFonts.forEach((loadedFont2) => {
        document.fonts.add(loadedFont2);
      });
      document.documentElement.classList.add('fonts-loaded-2');
      sessionStorage.setItem('customFontLoaded2', 'true');
    });
  });
}
