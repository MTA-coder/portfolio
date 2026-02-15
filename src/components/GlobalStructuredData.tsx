import React from 'react'
import { Helmet } from 'react-helmet-async'

const GlobalStructuredData: React.FC = () => {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Mohammed Tawfeq Amiri',
      jobTitle: 'Full Stack Engineer',
      url: 'https://yourwebsite.com/',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'Denmark',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Denmark',
      },
      sameAs: [
        'https://www.linkedin.com/in/mohammed-tawfeq-amiri',
        'https://github.com/MTA-coder',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Mohammed Tawfeq Amiri Portfolio',
      url: 'https://yourwebsite.com/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://yourwebsite.com/?q={search_term_string}',
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
