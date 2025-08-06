export default function ConfiguratorIframe({ src = "about:blank", title = "3D Garage Configurator" }) {
  return (
    <iframe 
      src={src} 
      className="w-full h-full border-none bg-[#E6E6E6]"
      title={title}
    />
  );
}
