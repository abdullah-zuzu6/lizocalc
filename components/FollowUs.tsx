import Link from 'next/link'
import { Facebook, Instagram, Youtube , Linkedin} from 'lucide-react'

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/lizocalc/',
    Icon: Linkedin,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61573367673248',
    Icon: Facebook,
  },
]

export default function FollowUs() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16 text-white text-center">
      <h4 className="font-semibold mb-6 text-xl">Follow Us On </h4>

      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        {socialLinks.map(({ name, href, Icon }) => (
          <Link
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary transition-colors text-sm font-medium"
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            {name}
          </Link>
        ))}
      </div>
    </section>
  )
}