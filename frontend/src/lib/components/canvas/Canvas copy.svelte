<script lang="ts">
    import { onMount } from 'svelte';
    import Konva from 'konva';
  
    // Runes for reactive variables
    let stageRef: HTMLDivElement;
    let stage: Konva.Stage | null = null;
  
    // Configuration for the virtual scene
    const sceneWidth = 100;
    const sceneHeight = 100;
  
    function createStage() {
      if (!stageRef) return;
  
      // Create Konva stage
      stage = new Konva.Stage({
        container: stageRef,
        width: sceneWidth,
        height: sceneHeight,
      });
  
      const layer = new Konva.Layer();
      stage.add(layer);

  
      // Add rectangle in bottom right
      const rect = new Konva.Rect({
        fill: 'green',
        x: 0,
        y: 0,
        width: stage.width(),
        height: stage.height(),
      });
      layer.add(rect);
  
      // Initial fit
      fitStageIntoParentContainer();
    }
  
    function fitStageIntoParentContainer() {
      if (!stageRef || !stage) return;
  
      const containerWidth = stageRef.parentElement?.offsetWidth || window.innerWidth;
      const widthScale = containerWidth / sceneWidth;
      const containerHeight = stageRef.parentElement?.offsetHeight || window.innerHeight;
      const heightScale = containerHeight / sceneHeight;
  
      stage.width(sceneWidth * widthScale);
      stage.height(sceneHeight * heightScale);
    }
  
    // Setup resize listener
    onMount(() => {
      createStage();
  
      window.addEventListener('resize', fitStageIntoParentContainer);
  
      return () => {
        window.removeEventListener('resize', fitStageIntoParentContainer);
        stage?.destroy();
      };
    });
  </script>
  
  <div 
    bind:this={stageRef} 
    bind:
    class="w-full"
  ></div>
  
  <style>
    div {
      max-width: 100%;
      overflow: hidden;
    }
  </style>