import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'
import ganeshaImg from '../ganesha.png'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Praveen Kumar & Sindhuja — Wedding Invitation' },
      {
        name: 'description',
        content:
          'Join us to celebrate the wedding of Praveen Kumar and Sindhuja on December 13 and 14, 2026 in Madurai.',
      },
      { name: 'theme-color', content: '#5b0f1a' },
    ],
    links: [
      { rel: 'icon', href: ganeshaImg, type: 'image/png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Noto+Serif+Tamil:wght@500;600&family=Great+Vibes&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
