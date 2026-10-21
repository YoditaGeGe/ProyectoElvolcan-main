function VideoSeguridad() {
  return (
    <section className="video-seccion">
      <h3>Uso seguro del cilindro de gas</h3>
      <p>Antes de instalar tu cilindro, revisa estos consejos de seguridad.</p>

      <div className="video">
        <video controls autoPlay muted playsInline>
          <source
            src="/videos/Capsula Uso del cilindro de gas SINAPRED.mp4"
            type="video/mp4"
          />
          Tu navegador no admite la reproducción de videos.
        </video>
      </div>
    </section>
  );
}

export default VideoSeguridad;
