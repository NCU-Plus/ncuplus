<template>
  <nav
    class="flex items-center justify-between bg-blue-400 text-white fixed w-full z-50 h-50"
  >
    <NuxtLink class="lg:ml-48 p-2 mr-4 inline-flex items-center" to="/">
      NCU+
    </NuxtLink>
    <div class="lg:mr-48 w-full lg:inline-flex lg:flex-grow">
      <div class="flex flex-row-reverse w-full items-center">
        <ClientOnly>
          <NavbarUserDropdown />
          <NavbarLoginButton />
        </ClientOnly>
        <NavbarDropdown
          :items="[
            {
              label: '全校課程',
              action: () => navigateTo('/courses'),
            },
            {
              label: '心得總覽',
              action: () => navigateTo('/reviews'),
            },
            {
              label: '模擬排課',
              action: () => navigateTo('/courses/simulation'),
            },
          ]"
        >
          全校課程
        </NavbarDropdown>
      </div>
    </div>
  </nav>
</template>
