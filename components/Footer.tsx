'use client'

const navLinks = [
  { label: 'Home',     id: 'header'    },
  { label: 'About',    id: 'about'     },
  { label: 'Skills',   id: 'skills'    },
  { label: 'Services', id: 'services'  },
  { label: 'Work',     id: 'portfolio' },
  { label: 'Contact',  id: 'contact'   },
]

const socials = [
  { href: 'https://github.com/CertifiedAuthur',                       icon: 'fa-brands fa-github'    },
  { href: 'https://www.linkedin.com/in/chibuzor-okafor-0b9a92374',   icon: 'fa-brands fa-linkedin'  },
  { href: 'https://x.com/AuthurOkafor',                               icon: 'fa-brands fa-x-twitter' },
  { href: 'https://www.instagram.com/official_certifiedauthur/',      icon: 'fa-brands fa-instagram' },
]

export default function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-surface-2 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-[8%] py-12">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 justify-between">

          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-display font-bold text-[17px] text-foreground mb-2">
              CertifiedAuthur
            </p>
            <p className="text-muted text-[13px] leading-relaxed">
              Full-Stack AI Engineer building production-grade intelligent systems from Nigeria.
            </p>
            <div className="flex gap-4 mt-5">
              {socials.map(({ href, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent transition-colors duration-200 text-[18px]"
                >
                  <i className={icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <p className="eyebrow text-muted mb-4">Navigation</p>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5">
              {navLinks.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-[14px] text-muted hover:text-foreground transition-colors duration-200 cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-[13px] text-muted leading-relaxed mb-6 max-w-xl">
            Every system I build is designed with one standard in mind: whether it is still
            running correctly, at scale, two years from now.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[13px] text-muted">
            <p>Copyright &copy; {new Date().getFullYear()} CertifiedAuthur. All rights reserved.</p>
            <p>Designed and built by Chibuzor Authur Okafor</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
