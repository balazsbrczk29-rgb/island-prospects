import{r as n,j as e}from"./site-yw4zcGlk.js";import{R as M,V as c,S as j,B as E,U as w,M as P,d as z,_ as b,C as R,A as T,e as v,c as u,a as f}from"./extends-CRfhRdWk.js";const C=parseInt(M.replace(/\D+/g,""));var _=Object.defineProperty,B=(t,o,a)=>o in t?_(t,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[o]=a,m=(t,o,a)=>(B(t,typeof o!="symbol"?o+"":o,a),a);const D=(()=>{const t={uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new c},up:{value:new c(0,1,0)}},vertexShader:`
      uniform vec3 sunPosition;
      uniform float rayleigh;
      uniform float turbidity;
      uniform float mieCoefficient;
      uniform vec3 up;

      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      // constants for atmospheric scattering
      const float e = 2.71828182845904523536028747135266249775724709369995957;
      const float pi = 3.141592653589793238462643383279502884197169;

      // wavelength of used primaries, according to preetham
      const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
      // this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
      // (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
      const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

      // mie stuff
      // K coefficient for the primaries
      const float v = 4.0;
      const vec3 K = vec3( 0.686, 0.678, 0.666 );
      // MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
      const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

      // earth shadow hack
      // cutoffAngle = pi / 1.95;
      const float cutoffAngle = 1.6110731556870734;
      const float steepness = 1.5;
      const float EE = 1000.0;

      float sunIntensity( float zenithAngleCos ) {
        zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
        return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
      }

      vec3 totalMie( float T ) {
        float c = ( 0.2 * T ) * 10E-18;
        return 0.434 * c * MieConst;
      }

      void main() {

        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position.z = gl_Position.w; // set z to camera.far

        vSunDirection = normalize( sunPosition );

        vSunE = sunIntensity( dot( vSunDirection, up ) );

        vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

        float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

      // extinction (absorbtion + out scattering)
      // rayleigh coefficients
        vBetaR = totalRayleigh * rayleighCoefficient;

      // mie coefficients
        vBetaM = totalMie( turbidity ) * mieCoefficient;

      }
    `,fragmentShader:`
      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      uniform float mieDirectionalG;
      uniform vec3 up;

      const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );

      // constants for atmospheric scattering
      const float pi = 3.141592653589793238462643383279502884197169;

      const float n = 1.0003; // refractive index of air
      const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

      // optical length at zenith for molecules
      const float rayleighZenithLength = 8.4E3;
      const float mieZenithLength = 1.25E3;
      // 66 arc seconds -> degrees, and the cosine of that
      const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

      // 3.0 / ( 16.0 * pi )
      const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
      // 1.0 / ( 4.0 * pi )
      const float ONE_OVER_FOURPI = 0.07957747154594767;

      float rayleighPhase( float cosTheta ) {
        return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
      }

      float hgPhase( float cosTheta, float g ) {
        float g2 = pow( g, 2.0 );
        float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
        return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
      }

      void main() {

        vec3 direction = normalize( vWorldPosition - cameraPos );

      // optical length
      // cutoff angle at 90 to avoid singularity in next formula.
        float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
        float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
        float sR = rayleighZenithLength * inverse;
        float sM = mieZenithLength * inverse;

      // combined extinction factor
        vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

      // in scattering
        float cosTheta = dot( direction, vSunDirection );

        float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
        vec3 betaRTheta = vBetaR * rPhase;

        float mPhase = hgPhase( cosTheta, mieDirectionalG );
        vec3 betaMTheta = vBetaM * mPhase;

        vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
        Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

      // nightsky
        float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
        float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
        vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
        vec3 L0 = vec3( 0.1 ) * Fex;

      // composition + solar disc
        float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
        L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

        vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

        vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

        gl_FragColor = vec4( retColor, 1.0 );

      #include <tonemapping_fragment>
      #include <${C>=154?"colorspace_fragment":"encodings_fragment"}>

      }
    `},o=new j({name:"SkyShader",fragmentShader:t.fragmentShader,vertexShader:t.vertexShader,uniforms:w.clone(t.uniforms),side:E,depthWrite:!1});class a extends P{constructor(){super(new z(1,1,1),o)}}return m(a,"SkyShader",t),m(a,"material",o),a})();function G(t,o,a=new c){const i=Math.PI*(t-.5),r=2*Math.PI*(o-.5);return a.x=Math.cos(r),a.y=Math.sin(i),a.z=Math.sin(r),a}const A=n.forwardRef(({inclination:t=.6,azimuth:o=.1,distance:a=1e3,mieCoefficient:i=.005,mieDirectionalG:r=.8,rayleigh:h=.5,turbidity:p=10,sunPosition:d=G(t,o),...x},g)=>{const y=n.useMemo(()=>new c().setScalar(a),[a]),[S]=n.useState(()=>new D);return n.createElement("primitive",b({object:S,ref:g,"material-uniforms-mieCoefficient-value":i,"material-uniforms-mieDirectionalG-value":r,"material-uniforms-rayleigh-value":h,"material-uniforms-sunPosition-value":d,"material-uniforms-turbidity-value":p,scale:y},x))}),s=new c().setFromSphericalCoords(1,v.degToRad(88.6),v.degToRad(205)),I=`
uniform float uTime; varying vec3 vWorld; varying vec3 vN;
float h(vec2 p, float t){ return sin(p.x*.35+t*.6)*.18 + sin(p.y*.5+t*.45)*.12 + sin((p.x+p.y)*1.3+t*1.2)*.05 + sin((p.x-p.y)*2.7+t*1.7)*.02; }
void main(){
  vec3 p = position; float t = uTime;
  p.z += h(p.xy, t);
  float e=.05; float hx = h(p.xy+vec2(e,0.),t)-h(p.xy-vec2(e,0.),t); float hy = h(p.xy+vec2(0.,e),t)-h(p.xy-vec2(0.,e),t);
  vN = normalize(vec3(-hx/(2.*e), -hy/(2.*e), 1.));
  vec4 w = modelMatrix * vec4(p,1.); vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,N=`
uniform vec3 uSun; uniform vec3 uDeep; uniform vec3 uSky; uniform vec3 uGlint; varying vec3 vWorld; varying vec3 vN;
void main(){
  vec3 n = normalize(vec3(vN.x, vN.z, -vN.y));
  vec3 v = normalize(cameraPosition - vWorld);
  float fres = pow(1. - max(dot(n, v), 0.), 4.);
  vec3 r = reflect(-v, n);
  float spec = pow(max(dot(r, normalize(uSun)), 0.), 220.) * 3.0;
  float sheen = pow(max(dot(r, normalize(uSun)), 0.), 18.) * .35;
  vec3 col = mix(uDeep, uSky, clamp(fres*0.9, 0., 1.));
  float toSun = max(dot(normalize(vec3(r.x,0.,r.z)), normalize(vec3(uSun.x,0.,uSun.z))), 0.);
  col += vec3(1.0,.55,.28) * pow(toSun, 12.) * fres * .5;
  col += uGlint * (spec + sheen);
  float dist = length(vWorld.xz - cameraPosition.xz);
  col = mix(col, vec3(.85,.62,.48), smoothstep(40., 110., dist));
  gl_FragColor = vec4(col, 1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;function F(){const t=n.useRef(null),o=n.useMemo(()=>({uTime:{value:0},uSun:{value:s.clone()},uDeep:{value:new u("#06222c")},uSky:{value:new u("#6f8c99")},uGlint:{value:new u("#ffc58a")}}),[]);return f((a,i)=>{t.current.uniforms.uTime.value+=i}),e.jsxs("mesh",{rotation:[-Math.PI/2,0,0],children:[e.jsx("planeGeometry",{args:[220,220,260,260]}),e.jsx("shaderMaterial",{ref:t,vertexShader:I,fragmentShader:N,uniforms:o})]})}function k(){const t=n.useRef(null);f(({clock:a})=>{const i=a.elapsedTime;t.current.position.set(4.5+i*.12%8,.12+Math.sin(i*1.2)*.04,-22),t.current.rotation.z=Math.sin(i*.9)*.012});const o="#121a1f";return e.jsxs("group",{ref:t,scale:.9,children:[e.jsxs("mesh",{position:[0,.25,0],children:[e.jsx("boxGeometry",{args:[4.2,.5,1.1]}),e.jsx("meshStandardMaterial",{color:o,roughness:.4})]}),e.jsxs("mesh",{position:[2.35,.25,0],rotation:[0,Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[.78,.5,.78]}),e.jsx("meshStandardMaterial",{color:o})]}),e.jsxs("mesh",{position:[-.2,.72,0],children:[e.jsx("boxGeometry",{args:[2.3,.45,.95]}),e.jsx("meshStandardMaterial",{color:o})]}),e.jsxs("mesh",{position:[-.5,1.08,0],children:[e.jsx("boxGeometry",{args:[1.3,.28,.85]}),e.jsx("meshStandardMaterial",{color:o})]}),e.jsxs("mesh",{position:[-.2,.74,.48],children:[e.jsx("boxGeometry",{args:[2,.12,.01]}),e.jsx("meshBasicMaterial",{color:"#ffcf8a"})]}),e.jsxs("mesh",{position:[-.6,1.6,0],children:[e.jsx("cylinderGeometry",{args:[.02,.02,.9,6]}),e.jsx("meshStandardMaterial",{color:o})]})]})}function l({x:t,z:o,color:a}){const i=n.useRef(null);return f(({clock:r})=>{i.current.position.y=Math.sin(r.elapsedTime*1.4+t)*.05}),e.jsxs("group",{ref:i,position:[t,0,o],children:[e.jsxs("mesh",{position:[0,.5,0],children:[e.jsx("cylinderGeometry",{args:[.08,.14,1,10]}),e.jsx("meshStandardMaterial",{color:a})]}),e.jsxs("mesh",{position:[0,1.08,0],children:[e.jsx("sphereGeometry",{args:[.05,10,10]}),e.jsx("meshBasicMaterial",{color:a==="#2f7d4f"?"#7dffa8":"#ff8a7a"})]})]})}function L(){return f(({camera:t,clock:o,pointer:a})=>{const i=o.elapsedTime;t.position.x=Math.sin(i*.05)*.8+a.x*.6,t.position.y=1.6+a.y*.15,t.lookAt(0,2.2,-30)}),null}function V(){return e.jsxs(R,{dpr:[1,1.75],camera:{position:[0,1.6,6],fov:42,near:.1,far:400},gl:{antialias:!0,toneMapping:T,toneMappingExposure:.5},"aria-hidden":"true",children:[e.jsx(A,{distance:4500,sunPosition:[s.x*100,s.y*100,s.z*100],turbidity:9,rayleigh:3,mieCoefficient:.005,mieDirectionalG:.88}),e.jsx("ambientLight",{intensity:.25}),e.jsx("directionalLight",{position:[s.x*50,10,s.z*50],intensity:.6,color:"#ffcf9a"}),e.jsx(F,{}),e.jsx(k,{}),e.jsx(l,{x:-2.2,z:-9,color:"#2f7d4f"}),e.jsx(l,{x:2.4,z:-9,color:"#b2453a"}),e.jsx(l,{x:-1.6,z:-20,color:"#2f7d4f"}),e.jsx(l,{x:1.8,z:-20,color:"#b2453a"}),e.jsx(L,{})]})}export{V as default};
