import { useState } from "react";
import type { ChangeEvent } from "react";

function ColorConverter() {
  const [color, setColor] = useState({ hex: '#34495e', isValid: true, rgb: 'rgb(52, 73, 94)' });

  const hex2rgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
  };
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value: hex } = target;

    setColor((prevState) => ({ ...prevState, hex }));

    if (hex.length >= 7) {
      const isValid = validHexColor(hex);

      setColor((prevState) => ({ ...prevState, isValid }));

      if (isValid) {
        const rgb = hex2rgb(hex);

        setColor((prevState) => ({ ...prevState, rgb }));

        document.body.style.backgroundColor = rgb;
      } else {
        document.body.style.backgroundColor = 'rgb(231, 76, 60)';
      }
    }
  };
  const validHexColor = (color: string): boolean => /^#[a-f0-9]{6}$/i.test(color);

  return (
    <div className="color-converter">
      <input className="color-converter__input" value={color.hex} onChange={handleChange} />
      <div className="color-converter__result">{color.isValid ? color.rgb : "Ошибка!"}</div>
    </div>
  );
}

export default ColorConverter;
