import Image from 'next/image';

export default function NotFound() {
    return (   
      <>
      <div class="flex flex-col items-center justify-center min-h-[100dvh] gap-6 px-4 md:px-6 mt-10">
    <div class="flex flex-col items-center justify-center gap-4">
      {/* <img src="404.webp" alt="404" width="350"/> */}
      <div style={{ width: '350px', height: 'auto' }}>
      <Image
        src="/404.webp"  // Path to your image file
        alt="404"        // Alt text for accessibility
        layout="responsive"  // Adjust the layout to fit the container
        width={350}      // Width of the image
        height={350}    // Maintain aspect ratio automatically
      />
    </div>
      <h1 class="text-3xl font-bold">Oops! Page not found.</h1>
      <p class="text-muted-foreground text-lg">The page you're looking for doesn't exist or has been moved.</p>
    </div>
    <a
      class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      href="/"
    >
      Go back home
    </a>
  </div>
      </>
    ) ;
  } 