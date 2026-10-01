'use client';
import {useEffect,useRef,useState} from 'react';
import type * as Three from 'three';

/** Original Revit geometry; only the camera and surface materials change. */
export default function OrbitalModel({angle=35,interactive=false,cinematic=false,cut=0}:{angle?:number;interactive?:boolean;cinematic?:boolean;cut?:number}){
  const host=useRef<HTMLDivElement>(null),current=useRef(angle),redraw=useRef<(()=>void)|null>(null);
  const cutRef=useRef(cut),clipUpdate=useRef<((value:number)=>void)|null>(null);
  useEffect(()=>{cutRef.current=cut;clipUpdate.current?.(cut);},[cut]);
  const [status,setStatus]=useState('Preparando materiales…');
  useEffect(()=>{current.current=angle;redraw.current?.();},[angle]);
  useEffect(()=>{
    let disposed=false,renderer:Three.WebGLRenderer|undefined,scene:Three.Scene|undefined,observer:ResizeObserver|undefined;
    const textures:Three.Texture[]=[];let disposeEffects=()=>{},disposeControls=()=>{};
    const element=host.current!;const mobile=matchMedia('(max-width:760px)').matches;
    async function setup(){
      const T=await import('three');
      const {GLTFLoader}=await import('three/examples/jsm/loaders/GLTFLoader.js');

      if(disposed)return;
      renderer=new T.WebGLRenderer({antialias:!mobile,powerPreference:'high-performance'});
      renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1:2));renderer.setClearColor('#ffffff');renderer.clippingPlanes=[new T.Plane(new T.Vector3(0,1,0),.35)];
      renderer.shadowMap.enabled=!mobile;renderer.shadowMap.type=T.PCFShadowMap;
      renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
      renderer.domElement.style.cssText='width:100%;height:100%;display:block;touch-action:pan-y';
      renderer.domElement.setAttribute('aria-label','Órbita de Casa Piaggio con materiales y cámara a nivel del observador');
      element.appendChild(renderer.domElement);
      scene=new T.Scene();scene.background=new T.Color('#ffffff');scene.add(new T.HemisphereLight(0xe8efff,0x998c78,1.65));
      const sun=new T.DirectionalLight(0xfff2df,3.2);sun.position.set(24,16,18);sun.castShadow=true;
      sun.shadow.mapSize.set(mobile?1024:4096,mobile?1024:4096);Object.assign(sun.shadow.camera,{left:-24,right:24,top:24,bottom:-24,far:100});
      sun.shadow.normalBias=.015;sun.shadow.bias=-.00006;scene.add(sun);
      const fill=new T.DirectionalLight(0xfff3e0,1.25);fill.position.set(-8,8,-15);scene.add(fill);
      const camera=new T.OrthographicCamera(-15,15,6,-6,.1,200);
      let composer:import('three/examples/jsm/postprocessing/EffectComposer.js').EffectComposer|undefined;
      if(!mobile){
      const [{EffectComposer},{RenderPass},{GTAOPass},{OutputPass}]=await Promise.all([import('three/examples/jsm/postprocessing/EffectComposer.js'),import('three/examples/jsm/postprocessing/RenderPass.js'),import('three/examples/jsm/postprocessing/GTAOPass.js'),import('three/examples/jsm/postprocessing/OutputPass.js')]);
      const target=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,samples:4});
      composer=new EffectComposer(renderer,target);composer.addPass(new RenderPass(scene,camera));
      const ao=new GTAOPass(scene,camera,1,1);ao.updateGtaoMaterial({radius:.5,thickness:1,distanceExponent:1.5,scale:1});composer.addPass(ao);
      const output=new OutputPass();composer.addPass(output);const effects=composer;disposeEffects=()=>{ao.dispose();output.dispose();effects.dispose();};
      }
      const draw=()=>{if(disposed||!renderer||!scene)return;if(!interactive){const a=current.current*Math.PI/180;if(cinematic)camera.position.set(32,32,32);else camera.position.set(Math.sin(a)*65,1.6,Math.cos(a)*65);camera.lookAt(0,1.6,0);}if(mobile)renderer.render(scene,camera);else composer?.render();};
      if(interactive){camera.position.set(32,26,38);camera.lookAt(0,1.6,0);const {OrbitControls}=await import('three/examples/jsm/controls/OrbitControls.js');if(disposed)return;const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,1.6,0);controls.enableDamping=false;controls.minZoom=.55;controls.maxZoom=3;controls.maxPolarAngle=Math.PI*.48;controls.addEventListener('change',draw);controls.update();disposeControls=()=>controls.dispose();}
      redraw.current=draw;
      const resize=()=>{if(!renderer)return;const w=element.clientWidth,h=element.clientHeight;if(!w||!h)return;
        renderer.setSize(w,h,false);composer?.setSize(w,h);const halfW=cinematic?Math.max(20,15*w/h):interactive?24:16.1,halfH=halfW*h/w;Object.assign(camera,{left:-halfW,right:halfW,top:halfH+1.05,bottom:-halfH+1.05});camera.updateProjectionMatrix();draw();};
      observer=new ResizeObserver(resize);observer.observe(element);resize();
      const loader=new T.TextureLoader();
      const maps=new Map<string,Three.Texture[]>();
      const [gltf]=await Promise.all([(async()=>{const loader=new GLTFLoader();if(mobile&&typeof DecompressionStream!=='undefined'){const response=await fetch('/models/casa-piaggio/orbita-mobile.glb.gz');if(!response.ok||!response.body)throw new Error('Model unavailable');const buffer=await new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();return loader.parseAsync(buffer,'/models/casa-piaggio/');}return loader.loadAsync('/models/casa-piaggio/orbita.glb?v=pbr2');})(),...['brick','roof','concrete','wood','grass'].map(async kind=>{
        const loaded=await Promise.all(['color','normal','rough'].map(async channel=>{
          const texture=await loader.loadAsync(`/models/casa-piaggio/materials/${mobile?'mobile/':''}${kind}-${channel}.jpg`);
          if(disposed){texture.dispose();return texture;}
          texture.wrapS=texture.wrapT=T.RepeatWrapping;texture.flipY=false;
          texture.anisotropy=Math.min(mobile?2:16,renderer!.capabilities.getMaxAnisotropy());
          texture.colorSpace=channel==='color'?T.SRGBColorSpace:T.NoColorSpace;textures.push(texture);return texture;
        }));maps.set(kind,loaded);
      })]);
      if(disposed){gltf.scene.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose();}});return;}
      gltf.scene.traverse(o=>{if(!(o instanceof T.Mesh))return;
        const material=o.material as Three.MeshStandardMaterial,kind=material.name;
        o.castShadow=!['glass','water','grass','earth'].includes(kind);o.receiveShadow=true;
        const mapped=maps.get(kind);
        if(mapped){
          [material.map,material.normalMap,material.roughnessMap]=mapped;
          material.color.set(kind==='roof'?'#84898e':kind==='brick'?'#c68f78':kind==='grass'?'#809575':'#ffffff');
          material.normalScale.setScalar(kind==='roof'?.85:kind==='brick'?.32:kind==='wood'?.08:.15);
          material.roughness=kind==='wood'?.78:1;material.metalness=0;
        }
        if(kind==='water'){o.position.y+=.42;material.color.set('#66a7b3');material.roughness=.13;material.metalness=.25;material.opacity=.85;material.transparent=true;material.depthWrite=false;}
        if(kind==='wood'){material.color.set('#c0a182');material.roughness=.85;}
        if(kind==='glass'){material.color.set('#8fa8b0');material.roughness=.16;material.metalness=.2;material.opacity=.4;material.transparent=true;material.depthWrite=false;}
        if(kind==='concrete'){
          material.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>','#include <map_fragment>\ndiffuseColor.rgb=mix(diffuseColor.rgb,vec3(.63),.32);');};
          material.customProgramCacheKey=()=> 'piaggio-board-concrete';
        }
        if(kind==='earth'){
          material.onBeforeCompile=s=>{
            s.vertexShader='varying vec3 groundPosition;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ngroundPosition=position;');
            s.fragmentShader='varying vec3 groundPosition;\n'+s.fragmentShader;
            s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\nif(groundPosition.y<-.35)discard;float grain=fract(sin(dot(groundPosition,vec3(127.1,311.7,74.7)))*43758.5453);diffuseColor.rgb*=.83+.25*grain;diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.16,.23,.065),smoothstep(-.16,-.035,groundPosition.y));');
          };material.customProgramCacheKey=()=> 'piaggio-grass-edge';
        }
        material.needsUpdate=true;
      });
      const tree=new T.Group();tree.name='Árbol del patio central';
      const bark=new T.MeshStandardMaterial({color:'#77614c',roughness:1});const trunk=new T.Mesh(new T.CylinderGeometry(.09,.15,2.7,9),bark);trunk.position.y=1.35;tree.add(trunk);
      for(let i=0;i<7;i++){const a=i*2.39996;const end=new T.Vector3(Math.cos(a)*(.48+i%2*.18),2.05+i%3*.26,Math.sin(a)*(.48+i%2*.18));const start=new T.Vector3(0,1.35+i*.09,0);const axis=end.clone().sub(start);const branch=new T.Mesh(new T.CylinderGeometry(.018,.04,axis.length(),6),bark);branch.position.copy(start.add(end).multiplyScalar(.5));branch.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),axis.normalize());tree.add(branch);
      for(let j=0;j<3;j++){const leaf=new T.Mesh(new T.IcosahedronGeometry(.3+j*.035,1),new T.MeshStandardMaterial({color:'#667849',roughness:1}));leaf.position.copy(end).add(new T.Vector3(Math.cos(j*2.1)*.16,j*.04,Math.sin(j*2.1)*.16));leaf.scale.set(1,.22,1);leaf.castShadow=true;tree.add(leaf);}}tree.position.set(2,0,-.25);gltf.scene.add(tree);
      scene.add(gltf.scene);const bounds=new T.Box3().setFromObject(gltf.scene);clipUpdate.current=(value)=>{if(!renderer)return;renderer.clippingPlanes=value>0?[new T.Plane(new T.Vector3(0,1,0),.35),new T.Plane(new T.Vector3(-1,0,0),bounds.max.x-(bounds.max.x-bounds.min.x)*value)]:[new T.Plane(new T.Vector3(0,1,0),.35)];draw();};clipUpdate.current(cutRef.current);setStatus('');draw();renderer.shadowMap.autoUpdate=true;
    }
    setup().catch(()=>{if(!disposed)setStatus('No se pudieron cargar los materiales. Podés consultar las fachadas en “Ampliar”.');});
    return()=>{disposed=true;redraw.current=null;observer?.disconnect();scene?.traverse(o=>{const mesh=o as Three.Mesh;if(mesh.isMesh){mesh.geometry.dispose();for(const m of Array.isArray(mesh.material)?mesh.material:[mesh.material])m.dispose();}const light=o as Three.DirectionalLight;if(light.isDirectionalLight)light.shadow?.dispose();});textures.forEach(t=>t.dispose());disposeControls();disposeEffects();clipUpdate.current=null;renderer?.dispose();renderer?.domElement.remove();};
  },[]);
  return <div style={{position:'relative',width:'100%',height:'100%',minHeight:250}}><div ref={host} style={{position:'absolute',inset:0}}/>{status&&<div role="status" style={{position:'absolute',inset:0,display:'grid',placeItems:'center',padding:24,textAlign:'center',fontSize:16}}>{status}</div>}</div>;
}
