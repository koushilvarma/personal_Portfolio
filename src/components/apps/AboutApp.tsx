export default function AboutApp() {
  return (
    <div className="p-6 md:p-8 font-sans">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Fake Photo Placeholder */}
        <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 bg-white border-4 border-os-border shadow-brutal-md relative overflow-hidden">
          <img 
            src="https://avatars.githubusercontent.com/u/143738079?v=4" 
            alt="Koushil Varma Avatar"
            className="w-full h-full object-cover mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-300"
          />
          <div className="absolute -bottom-4 -right-4 bg-white border-2 border-os-border px-2 py-0.5 font-mono text-[10px] font-bold shadow-brutal-sm">
            v1.0.0
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Koushil Varma</h1>
          
          <div className="space-y-4 text-sm md:text-base font-medium leading-relaxed mb-8">
            <p className="bg-gray-100 border-l-4 border-os-border pl-4 py-2">
              <strong className="block mb-1">CURRENT STATUS:</strong>
              CSE (Honors) | Full Stack Dev | GDG On Campus Explorer | DevOps Enthusiast
            </p>
            
            <p>
              I treat infrastructure as software. By applying software engineering practices to operations, 
              I build systems that can be versioned, tested, and recreated from nothing in minutes.
            </p>
            <p>
              My expertise lies in container orchestration, cloud-native architecture, and the complex glue 
              that takes code from a developer's machine safely into production. I thrive in environments 
              where performance, security, and developer velocity are equally critical.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border-3 border-os-border p-3 bg-white flex flex-col justify-center">
               <span className="font-mono text-xs font-bold mb-1">FOCUS</span>
               <span className="font-bold">Cloud-Native Architectures</span>
            </div>
            <div className="border-3 border-os-border p-3 bg-white flex flex-col justify-center">
               <span className="font-mono text-xs font-bold mb-1">LOCATION</span>
               <span className="font-bold">India / Remote</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
