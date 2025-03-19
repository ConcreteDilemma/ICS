let colors = [];
let textFragments = [
    "Lost hyperlink detected...",
    "Memory not found.",
    "[Error 404] Resource missing.",
    "Fading digital archive...",
    "Decayed web fragment recovered."
];
let blendedColor;
let textLayer = [];

function preload() {
    // Load JSON color data (if using an external file)
    fetch("colors_data.json")
        .then(response => response.json())
        .then(data => colors = data.colors)
        .catch(error => console.error("Error loading JSON:", error));

    // Default colors in case JSON fails
    if (colors.length === 0) {
        colors = ["#E63946", "#F4A261", "#E9C46A", "#2A9D8F", "#264653", "#6A0572", "#9D0208", "#FFBA08", "#3D348B", "#8E3B46"];
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    blendedColor = color(random(colors));

    for (let i = 0; i < 5; i++) {
        textLayer.push({
            text: random(textFragments),
            x: random(width),
            y: random(height),
            opacity: random(50, 150)
        });
    }
}

function draw() {
    let targetColor = color(random(colors));
    blendedColor = lerpColor(blendedColor, targetColor, 0.01);
    background(blendedColor);
    
    for (let t of textLayer) {
        fill(255, t.opacity);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(t.text, t.x, t.y);
    }
}

function mouseMoved() {
    textLayer.push({
        text: random(textFragments),
        x: mouseX,
        y: mouseY,
        opacity: random(50, 150)
    });

    if (textLayer.length > 10) {
        textLayer.shift();
    }
}
