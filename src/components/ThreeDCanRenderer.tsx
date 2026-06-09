"use client";

import React, { useRef, useEffect, useState } from "react";

interface ThreeDCanRendererProps {
  frontImage: string;
  flavor: string;
  cals: string;
  sugar: string;
  sodium: string;
  ingredients: string[];
  benefit: string;
  primaryColor: string; // e.g. '#006d35'
  secondaryColor?: string; // e.g. '#003d1c'
  width?: number;
  height?: number;
  autoRotateSpeed?: number; // delta theta per frame
}

export const ThreeDCanRenderer: React.FC<ThreeDCanRendererProps> = ({
  frontImage,
  flavor,
  cals,
  sugar,
  sodium,
  ingredients,
  benefit,
  primaryColor,
  secondaryColor = "#191c1d",
  width = 240,
  height = 360,
  autoRotateSpeed = 0.006,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Angle state (radians)
  const thetaRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartThetaRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  const boundsRef = useRef({ left: 0, right: 0, top: 0, bottom: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = frontImage;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      let left = 0;
      let right = img.width - 1;
      let top = 0;
      let bottom = img.height - 1;

      try {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.drawImage(img, 0, 0);
          const imgData = tempCtx.getImageData(0, 0, img.width, img.height);
          const data = imgData.data;

          // Find left bound
          let foundLeft = false;
          for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
              const alpha = data[(y * img.width + x) * 4 + 3];
              if (alpha > 10) {
                left = x;
                foundLeft = true;
                break;
              }
            }
            if (foundLeft) break;
          }

          // Find right bound
          let foundRight = false;
          for (let x = img.width - 1; x >= 0; x--) {
            for (let y = 0; y < img.height; y++) {
              const alpha = data[(y * img.width + x) * 4 + 3];
              if (alpha > 10) {
                right = x;
                foundRight = true;
                break;
              }
            }
            if (foundRight) break;
          }

          // Find top bound
          let foundTop = false;
          for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
              const alpha = data[(y * img.width + x) * 4 + 3];
              if (alpha > 10) {
                top = y;
                foundTop = true;
                break;
              }
            }
            if (foundTop) break;
          }

          // Find bottom bound
          let foundBottom = false;
          for (let y = img.height - 1; y >= 0; y--) {
            for (let x = 0; x < img.width; x++) {
              const alpha = data[(y * img.width + x) * 4 + 3];
              if (alpha > 10) {
                bottom = y;
                foundBottom = true;
                break;
              }
            }
            if (foundBottom) break;
          }
          console.log(`[ThreeDCanRenderer] Bounds detected for ${flavor}:`, { left, right, top, bottom, width: img.width, height: img.height });
        }
      } catch (e) {
        console.warn(`[ThreeDCanRenderer] Failed to scan image bounds for ${flavor}:`, e);
      }

      boundsRef.current = { left, right, top, bottom };
      imgRef.current = img;
      setImageLoaded(true);
    };
  }, [frontImage, flavor]);

  // Render loop
  useEffect(() => {
    if (!imageLoaded || !imgRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imgRef.current;

    // Create a hidden canvas for the back label
    const backLabelCanvas = document.createElement("canvas");
    const labelW = Math.round(width * Math.PI * 0.7); // back label width
    const labelH = Math.round(height * 0.82); // back label height
    backLabelCanvas.width = labelW;
    backLabelCanvas.height = labelH;
    const lctx = backLabelCanvas.getContext("2d");
    
    if (lctx) {
      // Draw back label design
      const grad = lctx.createLinearGradient(0, 0, labelW, labelH);
      grad.addColorStop(0, primaryColor);
      grad.addColorStop(1, secondaryColor);
      lctx.fillStyle = grad;
      lctx.fillRect(0, 0, labelW, labelH);

      // Gold/White border
      lctx.strokeStyle = "rgba(255,255,255,0.15)";
      lctx.lineWidth = 4;
      lctx.strokeRect(6, 6, labelW - 12, labelH - 12);

      // Nutrition Facts Title
      lctx.fillStyle = "#ffffff";
      lctx.font = "bold 13px sans-serif";
      lctx.fillText("NUTRITION FACTS", 16, 26);
      
      lctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      lctx.fillRect(16, 34, labelW - 32, 1.5);

      // Specs list
      lctx.fillStyle = "#ffffff";
      lctx.font = "bold 9px monospace";
      lctx.fillText(`Calories: ${cals}`, 16, 50);
      lctx.fillText(`Sugar: ${sugar}`, 16, 66);
      lctx.fillText(`Sodium: ${sodium}`, 16, 82);

      lctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      lctx.fillRect(16, 92, labelW - 32, 1);

      // Benefit
      lctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      lctx.font = "bold 9px sans-serif";
      lctx.fillText("ACTIVE BENEFIT:", 16, 110);
      lctx.fillStyle = "#ffffff";
      lctx.font = "bold 10px sans-serif";
      lctx.fillText(benefit, 16, 126);

      lctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      lctx.fillRect(16, 138, labelW - 32, 1);

      // Ingredients
      lctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      lctx.font = "8px sans-serif";
      lctx.fillText("INGREDIENTS:", 16, 154);

      lctx.fillStyle = "#ffffff";
      lctx.font = "italic 8px sans-serif";
      
      // Wrap ingredients text
      let currentY = 168;
      const ingText = ingredients.join(", ");
      const words = ingText.split(" ");
      let line = "";
      
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = lctx.measureText(testLine);
        if (metrics.width > labelW - 32 && n > 0) {
          lctx.fillText(line, 16, currentY);
          line = words[n] + " ";
          currentY += 10;
        } else {
          line = testLine;
        }
      }
      lctx.fillText(line, 16, currentY);

      // Draw barcode (bubbly branding)
      const barcodeX = labelW - 55;
      const barcodeY = labelH - 34;
      lctx.fillStyle = "#ffffff";
      lctx.fillRect(barcodeX, barcodeY, 40, 20); // base white card
      
      lctx.fillStyle = "#000000";
      // Draw standard barcode lines
      let lineX = barcodeX + 3;
      while (lineX < barcodeX + 37) {
        const thickness = Math.random() < 0.5 ? 1 : 2;
        lctx.fillRect(lineX, barcodeY + 2, thickness, 16);
        lineX += thickness + (Math.random() < 0.4 ? 1 : 2);
      }
    }

    let animFrameId: number;

    // Dimensions
    const canW = width;
    const canH = height;
    const cylinderW = Math.round(canW * 0.88);
    const cylinderH = Math.round(canH * 0.78);
    const cylinderX = Math.round((canW - cylinderW) / 2);
    const cylinderY = Math.round((canH - cylinderH) / 2);

    const lidHeight = Math.round(canH * 0.05);

    const render = () => {
      // Rotate if not dragging and not hovered
      if (!isDraggingRef.current && !isHovered) {
        thetaRef.current += autoRotateSpeed;
      }

      ctx.clearRect(0, 0, canW, canH);

      // Set rotation angle
      const theta = thetaRef.current;

      // Draw bottom lid (cap) ellipse
      ctx.save();
      const bottomLidGrad = ctx.createLinearGradient(0, cylinderY + cylinderH, 0, cylinderY + cylinderH + lidHeight);
      bottomLidGrad.addColorStop(0, "#888888");
      bottomLidGrad.addColorStop(0.5, "#dddddd");
      bottomLidGrad.addColorStop(1, "#555555");
      ctx.fillStyle = bottomLidGrad;
      ctx.beginPath();
      ctx.ellipse(canW / 2, cylinderY + cylinderH, cylinderW / 2, lidHeight, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#444444";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.restore();

      // Cylinder strip rendering
      for (let x = 0; x < cylinderW; x++) {
        const u = x / (cylinderW - 1);
        const phi = Math.asin(2 * u - 1); // angle of this strip on screen (-PI/2 to PI/2)
        const alpha = phi + theta; // absolute angle on cylinder surface

        // Cosine of alpha determines front/back visibility
        const cosAlpha = Math.cos(alpha);

        if (cosAlpha >= 0) {
          // Front Side (from image texture)
          const uImg = (Math.sin(alpha) + 1) / 2;
          const { left, right, top, bottom } = boundsRef.current;
          const srcX = left + Math.round(uImg * (right - left));
          
          ctx.drawImage(
            img,
            srcX, top, 1, Math.max(1, bottom - top),
            cylinderX + x, cylinderY, 1, cylinderH
          );
        } else {
          // Back Side (from procedural label canvas)
          const alphaBack = alpha - Math.PI;
          const uLabel = (Math.sin(alphaBack) + 1) / 2;
          const srcX = Math.round(uLabel * (backLabelCanvas.width - 1));
          
          ctx.drawImage(
            backLabelCanvas,
            srcX, 0, 1, backLabelCanvas.height,
            cylinderX + x, cylinderY, 1, cylinderH
          );
        }
      }

      // Draw top lid (cap) ellipse
      ctx.save();
      const topLidGrad = ctx.createLinearGradient(0, cylinderY - lidHeight, 0, cylinderY);
      topLidGrad.addColorStop(0, "#666666");
      topLidGrad.addColorStop(0.3, "#bbbbbb");
      topLidGrad.addColorStop(0.6, "#ffffff");
      topLidGrad.addColorStop(1, "#888888");
      ctx.fillStyle = topLidGrad;
      ctx.beginPath();
      ctx.ellipse(canW / 2, cylinderY, cylinderW / 2, lidHeight, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#444444";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Top can tab inner rim
      ctx.fillStyle = "#dddddd";
      ctx.beginPath();
      ctx.ellipse(canW / 2, cylinderY, cylinderW / 2 - 4, lidHeight - 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Apply 3D volumetric lighting & reflective glossy shine overlay
      ctx.save();
      const lightGrad = ctx.createLinearGradient(cylinderX, 0, cylinderX + cylinderW, 0);
      lightGrad.addColorStop(0, "rgba(0,0,0,0.5)"); // Left shadow
      lightGrad.addColorStop(0.12, "rgba(0,0,0,0.15)");
      lightGrad.addColorStop(0.28, "rgba(255,255,255,0.4)"); // Specular highlight
      lightGrad.addColorStop(0.4, "rgba(255,255,255,0.0)");
      lightGrad.addColorStop(0.82, "rgba(0,0,0,0.1)");
      lightGrad.addColorStop(1, "rgba(0,0,0,0.55)"); // Right shadow
      
      ctx.fillStyle = lightGrad;
      ctx.fillRect(cylinderX, cylinderY, cylinderW, cylinderH);
      ctx.restore();

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [imageLoaded, isHovered, width, height, primaryColor, secondaryColor, cals, sugar, sodium, ingredients, benefit, autoRotateSpeed]);

  // Drag handlers
  const handleStart = (clientX: number) => {
    isDraggingRef.current = true;
    dragStartXRef.current = clientX;
    dragStartThetaRef.current = thetaRef.current;
  };

  const handleMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - dragStartXRef.current;
    // Map screen movement to rotation (speed coefficient = 0.007)
    thetaRef.current = dragStartThetaRef.current - deltaX * 0.007;
  };

  const handleEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div 
      className="relative flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleEnd();
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-grab active:cursor-grabbing max-w-full drop-shadow-[0_25px_30px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-300 z-10"
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
      />
      
      {/* Glossy shadow ellipse at the base */}
      <div 
        className="w-[180px] h-[12px] bg-black/15 dark:bg-black/35 rounded-full blur-[4px] mt-2 transition-all duration-300"
        style={{
          transform: isHovered ? "scale(1.08)" : "scale(1)",
          opacity: isHovered ? 0.8 : 0.6,
        }}
      />
    </div>
  );
};
