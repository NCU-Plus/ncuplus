<template>
  <nav
    class="flex items-center justify-between bg-blue-400 p-3 text-white fixed w-full z-50 h-50"
  >
    <NuxtLink class="lg:ml-48 p-2 mr-4 inline-flex items-center" to="/">
      NCU+
    </NuxtLink>
    <div class="lg:mr-48 w-full lg:inline-flex lg:flex-grow">
      <div class="flex flex-row-reverse w-full">
        <ClientOnly>
          <NavbarUserDropdown />
          <NavbarLoginButton />
        </ClientOnly>
        <NavbarLinkButton to="/courses"> 課程 </NavbarLinkButton>
      </div>
    </div>
  </nav>
</template>
