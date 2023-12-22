import hexToRgba from 'hex-to-rgba'

function formatColours (hex, active = true) {
  const rgba = active ? hexToRgba(hex, 1) : hexToRgba('#999', 0.1)
  return rgba // Return the array of formatted colours
}

export default formatColours
