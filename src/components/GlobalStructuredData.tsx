import React from 'react'
import { Helmet } from 'react-helmet-async'

const GlobalStructuredData: React.FC = () => {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Mohammed Tawfeq Amiri',
      jobTitle: 'Full Stack Developer',
      url: 'https://mta-coder.github.io/mta-digital-storyteller/',
      image:
        'https://mta-coder.github.io/mta-digital-storyteller/android-chrome-512x512.png',
      email: 'mohammed.tawfeq.amiri@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abu Dhabi',
        addressCountry: 'AE',
      },
      knowsAbout: [
        'Angular',
        '.NET Core',
        'Laravel',
        'TypeScript',
        'ERP Systems',
        'Full Stack Development',
      ],
      sameAs: [
        'https://www.linkedin.com/in/mohammed-tawfeq-amiri',
        'https://github.com/MTA-coder',
        'https://medium.com/@mahmmedtawfeqamirie',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Mohammed Tawfeq Amiri Portfolio',
      url: 'https://mta-coder.github.io/mta-digital-storyteller/',
      potentialAction: {
        '@type': 'SearchAction',
        target:
          'https://mta-coder.github.io/mta-digital-storyteller/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ]
  return (
    <Helmet>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(data)}
      </script>
    </Helmet>
  )
}

export default GlobalStructuredData
