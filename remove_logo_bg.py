from PIL import Image
import os

def remove_background(input_path, output_path):
    print(f"Opening image: {input_path}")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    # The "checkerboard" usually consists of white and light gray squares.
    # We can try to target these specific colors if they are outside the logo.
    # However, a simpler heuristic for "fake" transparency is to look for the high-frequency grid.
    # But since this is a JPG, the colors might be slightly off.
    
    # Let's try to remove pixels that are "grayscale-ish" and "too light" 
    # OR pixels that correspond to the common checkerboard colors.
    # Checkerboard white: ~255, 255, 255
    # Checkerboard gray: ~204, 204, 204 (often seen in fake PNGs)
    
    for item in datas:
        # Check if pixel is white or light gray
        r, g, b, a = item
        
        # Heuristic: If R, G, B are very close (grayscale) and bright, or match common checkerboard shades
        # White square
        if r > 240 and g > 240 and b > 240:
            new_data.append((r, g, b, 0))
        # Gray square (approx 204 or 192)
        elif 190 < r < 215 and 190 < g < 215 and 190 < b < 215:
            new_data.append((r, g, b, 0))
        # Another shade of gray
        elif 220 < r < 235 and 220 < g < 235 and 220 < b < 235:
            new_data.append((r, g, b, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved transparent logo to: {output_path}")

if __name__ == "__main__":
    input_file = "/Users/eubs/.gemini/antigravity/brain/2f33b74f-3ba2-456a-bba1-f8c66479e538/uploaded_image_1769533950456.jpg"
    output_file = "/Users/eubs/Downloads/action-exterior-redesign-main/src/assets/cowboy-badge-logo.png"
    remove_background(input_file, output_file)
