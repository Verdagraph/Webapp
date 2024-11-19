<script lang="ts">
    import Icon from "@iconify/svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
    import iconIds from "$lib/assets/icons";
    import type { PrimaryTabSpec } from "./tabs";

	type Props = {
		spec: PrimaryTabSpec /* Describes the content of the tab. */;
		flipped?: boolean /* If true, the tab is rendered bottom to top. */;
	};
	let { spec, flipped = false }: Props = $props();
  </script>

<Sidebar.MenuItem>
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <Sidebar.MenuButton
              {...props}
              class="data-[state=open]:bg-primary-3 data-[state=open]:text-primary-12"
            >
              <Icon icon={spec.iconId} width="3rem"/>
            </Sidebar.MenuButton>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          side="right"
          class="w-[--bits-dropdown-menu-anchor-width]"
        >
          <DropdownMenu.Group>
            <DropdownMenu.GroupHeading>
                {spec.label}
            </DropdownMenu.GroupHeading>
            <DropdownMenu.Separator />
            {#each spec.submenuItems ?? [] as item}
                <DropdownMenu.Item>
                    {#if item.iconId}
                      <Icon icon={item.iconId} width="3rem"/>
                    {/if}
                    <a href={item.url}>
                        {item.label}                
                    </a>
                </DropdownMenu.Item>
            {/each}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
</Sidebar.MenuItem>