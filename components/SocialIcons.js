// Inline SVG icons — exact paths of the icons the original site used via
// @iconify/react (uiw:facebook, teenyicons:instagram-solid), embedded at build
// time so nothing is fetched at runtime. The CSS border-radius on the icon
// classes clips the square glyphs into circles, matching production.

export function FacebookIcon({className, color = '#014CCC'}) {
    return (
        <svg className={className} viewBox="0 0 20 20" fill={color} aria-hidden="true">
            <path fillRule="evenodd"
                  d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.792C0 19.506.494 20 1.104 20h9.578v-7.745H8.076V9.237h2.606V7.01c0-2.584 1.578-3.99 3.883-3.99c1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.596-1.496 1.47v1.927h2.989l-.39 3.018h-2.6V20h5.097c.61 0 1.104-.494 1.104-1.104V1.104C20 .494 19.506 0 18.896 0"/>
        </svg>
    );
}

export function InstagramIcon({className, color = '#014CCC'}) {
    return (
        <svg className={className} viewBox="0 0 15 15" fill={color} aria-hidden="true">
            <path d="M7.5 5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M4.5 0A4.5 4.5 0 0 0 0 4.5v6A4.5 4.5 0 0 0 4.5 15h6a4.5 4.5 0 0 0 4.5-4.5v-6A4.5 4.5 0 0 0 10.5 0zM4 7.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0M11 4h1V3h-1z"/>
        </svg>
    );
}

export function MenuIcon({width = 30, color = '#FFFFFF'}) {
    return (
        <svg width={width} height={width} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
    );
}
