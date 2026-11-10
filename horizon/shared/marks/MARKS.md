# Horizon sample-data marks

One mark per fictional company, identical everywhere it appears (the three loops, the Webflow band, the agents panel, and the video build). People share one head-and-shoulders glyph. Horizon itself keeps its spark avatar.

Family: 24x24 viewBox, 6px-radius square tile, white glyph (solid fill, or a 2px stroke), per-company fill from the muted product palette. Render at whatever size the avatar slot is (24 to 30px in the loops); the SVG scales. Companies are fictional; nothing is drawn from a real logo.

Inline rule used in the loops and the band: the `<span>` that used to hold initials keeps its size and gets `background:none`; the SVG fills it (`display:block;width:100%;height:100%`).

| slug | company | fill | palette name | glyph |
|---|---|---|---|---|
| `larkspur` | Larkspur Implement Co. | `#3DC975` | green | a leaf: implement company, farm equipment |
| `marlin` | Marlin Marine | `#3840EA` | blue | two waves |
| `westbrook` | Westbrook Sensors | `#292932` | ink | a sensor: dot and ring |
| `pinecrest` | Pinecrest Controls | `#FF5C16` | orange | a pine |
| `kestrel` | Kestrel Medical | `#D58BE1` | pink | a medical plus |
| `northline` | Northline Metals | `#8ED7E6` | aqua | a north arrow |
| `apex` | Apex Coatings | `#F0D265` | gold | a droplet of coating |
| `halden` | Halden Metalworks | `#3d414a` | slate | an anvil: the sample shop itself |
| `harbor` | Harbor Fluid Systems | `#3840EA` | blue | an anchor |
| `tri-county` | Tri-County Trailer | `#FF5C16` | orange | a trailer |
| `summit` | Summit Powder Coating | `#3d414a` | slate | a peak with a snowcap: vendor |
| `prairie` | Prairie Powder Coat | `#8ED7E6` | aqua | grass blades: vendor; drawn by the video build, copied here unchanged |
| `person` | Any person (Tessa Brandvold, Dev Castillo, Priya Natarajan, Hana Sato, Tom Reyes, Mia Brooks, Ana Suarez, Emily S., Pat) | `#2a2d36` | avatar gray | head and shoulders |

Fills are shared where there are more companies than palette colors (Harbor with Marlin, Tri-County with Pinecrest, Summit with Halden); the glyph tells them apart.

## Inline SVG

### Larkspur Implement Co. (`larkspur.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Larkspur Implement Co."><rect width="24" height="24" rx="6" fill="#3DC975"/><path fill="#fff" d="M5 19C5 10.8 10.6 5.4 19 5c.4 8.4-5.2 14-14 14z"/><path d="M6 18 13.5 10.5" fill="none" stroke="#3DC975" stroke-width="2" stroke-linecap="round"/></svg>
```

### Marlin Marine (`marlin.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Marlin Marine"><rect width="24" height="24" rx="6" fill="#3840EA"/><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" d="M3.5 9.5c2.1 0 2.1-2.5 4.25-2.5s2.1 2.5 4.25 2.5 2.1-2.5 4.25-2.5 2.1 2.5 4.25 2.5M3.5 16.5c2.1 0 2.1-2.5 4.25-2.5s2.1 2.5 4.25 2.5 2.1-2.5 4.25-2.5 2.1 2.5 4.25 2.5"/></svg>
```

### Westbrook Sensors (`westbrook.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Westbrook Sensors"><rect width="24" height="24" rx="6" fill="#292932"/><circle cx="12" cy="12" r="7" fill="none" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="2.6" fill="#fff"/></svg>
```

### Pinecrest Controls (`pinecrest.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Pinecrest Controls"><rect width="24" height="24" rx="6" fill="#FF5C16"/><path fill="#fff" d="M12 3.5 16.2 9.5h-2.4l3.4 5h-2.6l3.4 4.5H6L9.4 14.5H6.8l3.4-5H7.8z"/><path fill="#fff" d="M10.9 19h2.2v2h-2.2z"/></svg>
```

### Kestrel Medical (`kestrel.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Kestrel Medical"><rect width="24" height="24" rx="6" fill="#D58BE1"/><path fill="#fff" d="M10 4.5h4V10h5.5v4H14v5.5h-4V14H4.5v-4H10z"/></svg>
```

### Northline Metals (`northline.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Northline Metals"><rect width="24" height="24" rx="6" fill="#8ED7E6"/><path fill="#fff" d="M12 3.5 17.5 19.5 12 15.8 6.5 19.5z"/></svg>
```

### Apex Coatings (`apex.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Apex Coatings"><rect width="24" height="24" rx="6" fill="#F0D265"/><path fill="#fff" d="M12 3.6c3.1 4 6 7.4 6 10.6a6 6 0 0 1-12 0c0-3.2 2.9-6.6 6-10.6z"/></svg>
```

### Halden Metalworks (`halden.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Halden Metalworks"><rect width="24" height="24" rx="6" fill="#3d414a"/><path fill="#fff" d="M3.5 7.5h17v3.2h-6.2V15h4.7v2.5H5V15h4.8v-4.3H8.6C6.1 10.7 4.2 9.6 3.5 7.5z"/></svg>
```

### Harbor Fluid Systems (`harbor.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Harbor Fluid Systems"><rect width="24" height="24" rx="6" fill="#3840EA"/><circle cx="12" cy="5.5" r="2" fill="none" stroke="#fff" stroke-width="2"/><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" d="M12 7.5v13M8.5 11h7M5 13.5c0 4 3 7 7 7s7-3 7-7"/></svg>
```

### Tri-County Trailer (`tri-county.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Tri-County Trailer"><rect width="24" height="24" rx="6" fill="#FF5C16"/><rect x="7" y="6.5" width="13.5" height="8.5" rx="1.2" fill="#fff"/><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" d="M7 11H3.5"/><circle cx="13.75" cy="17.8" r="2.3" fill="#fff"/></svg>
```

### Summit Powder Coating (`summit.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Summit Powder Coating"><rect width="24" height="24" rx="6" fill="#3d414a"/><path fill="#fff" d="M12 4.5 20 19.5H4z"/><path fill="#3d414a" d="M12 8.5 14.3 12.8 12 11.5 9.7 12.8z"/></svg>
```

### Any person (`person.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Any person"><rect width="24" height="24" rx="6" fill="#2a2d36"/><circle cx="12" cy="9" r="3.1" fill="#fff"/><path fill="#fff" d="M6 19.5c0-3.6 2.7-6 6-6s6 2.4 6 6z"/></svg>
```

### Prairie Powder Coat (`prairie.svg`)

```svg
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-label="Prairie Powder Coat"><rect width="24" height="24" rx="6" fill="#8ED7E6"/><path fill="#fff" d="M11 19.5C11 13.5 11.3 8.5 12 4c.7 4.5 1 9.500 1 15.500zM7.200 19.500C7 15 5.800 11.500 3.800 9c3 2 5.200 5.800 5.600 10.500zM16.800 19.500C17 15 18.200 11.500 20.200 9c-3 2-5.200 5.800-5.600 10.500z"/></svg>
```
