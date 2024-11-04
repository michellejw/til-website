import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		typography: {
			DEFAULT: {
				css: {
					color: '#1a1a1a',
					'code': {
						fontSize: '1rem',
						color: '#1a1a1a',
					},
					'pre code': {
						fontSize: '0.95rem',
						lineHeight: '1.5',
						color: '#1a1a1a',
					},
					'pre': {
						backgroundColor: '#f3f4f6',
						padding: '1rem',
						borderRadius: '0.375rem',
						margin: '1rem 0',
					},
					// Making all headings darker too
					'h1, h2, h3, h4, h5, h6': {
						color: '#1a1a1a',
					  },
					// Making links a nice blue color
					'a': {
						color: '#2563eb',
						'&:hover': {
						color: '#1d4ed8',
						},
					},
					// Ensuring paragraph text is dark
					'p': {
						color: '#1a1a1a',
						}				
				},
				
			}
		}
  	}
  },
  plugins: [require("tailwindcss-animate"),
	require("@tailwindcss/typography")
  ],
};
export default config;


