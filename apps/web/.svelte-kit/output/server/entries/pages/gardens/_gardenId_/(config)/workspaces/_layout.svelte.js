import { p as push, c as spread_attributes, d as bind_props, a as pop, e as copy_payload, f as assign_payload, g as spread_props, j as stringify } from "../../../../../../chunks/index2.js";
import { I as Icon } from "../../../../../../chunks/Icon.js";
import { u as useQuery } from "../../../../../../chunks/index.svelte.js";
import "../../../../../../chunks/client.js";
import { p as page } from "../../../../../../chunks/index5.js";
import { t as triplit } from "../../../../../../chunks/auth.svelte.js";
import { w as workspacesQuery, p as plantingAreaSelectionQuery } from "../../../../../../chunks/queries2.js";
import { g as gardenContext } from "../../../../../../chunks/gardenContext.svelte.js";
import { s as setWorkspaceContext, t as toolbox } from "../../../../../../chunks/activeWorkspace.svelte.js";
import { u as useMenuGroupHeading, M as Menubar, a as Menu, b as Menubar_trigger, c as Menubar_content, G as Group, d as Menubar_item, e as Menubar_separator, f as Menubar_checkbox_item, S as Sub, g as Menubar_sub_trigger, h as Menubar_sub_content, R as RadioGroup, i as Menubar_radio_item } from "../../../../../../chunks/index6.js";
import { B as Button } from "../../../../../../chunks/button.js";
import { e as useId, f as box, m as mergeProps } from "../../../../../../chunks/use-id.js";
import { c as cn } from "../../../../../../chunks/shadcn.js";
import { i as iconIds } from "../../../../../../chunks/icons.js";
function Menu_group_heading($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const groupHeadingState = useMenuGroupHeading({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, groupHeadingState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Menubar_group_heading($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    inset = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Menu_group_heading($$payload2, spread_props([
      {
        class: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  const workspaceContext = setWorkspaceContext();
  useQuery(triplit, workspacesQuery.Vars({ gardenId: page.params.gardenId }));
  useQuery(triplit, plantingAreaSelectionQuery.Vars({
    plantingAreaIds: [
      ...workspaceContext.selections.get("plantingArea")
    ]
  }));
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="flex h-full w-full flex-col overflow-clip"><!---->`;
    Menubar($$payload2, {
      class: "border-neutral-8 justify-center border-0 border-b md:justify-start",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Menu($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Menubar_trigger($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Workspaces`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Menubar_content($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Group($$payload5, {
                  children: ($$payload6) => {
                    {
                      $$payload6.out += "<!--[!-->";
                    }
                    $$payload6.out += `<!--]--> <!---->`;
                    Menubar_item($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->`;
                        Button($$payload7, {
                          href: `/gardens/${stringify(page.params.gardenId)}/workspaces`,
                          class: "flex h-full w-full justify-between",
                          children: ($$payload8) => {
                            $$payload8.out += `<span>See All</span> `;
                            Icon($$payload8, {
                              icon: iconIds.listIcon,
                              width: "1.25rem",
                              class: "text-neutral-10"
                            });
                            $$payload8.out += `<!---->`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> `;
                if (gardenContext.authorize("WorkspaceCreate")) {
                  $$payload5.out += "<!--[-->";
                  $$payload5.out += `<!---->`;
                  Menubar_separator($$payload5, {});
                  $$payload5.out += `<!----> <!---->`;
                  Menubar_item($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Button($$payload6, {
                        href: `//gardens/${stringify(page.params.gardenId)}/workspaces/create`,
                        class: "flex h-full w-full items-center justify-between",
                        children: ($$payload7) => {
                          $$payload7.out += `<span>Create Workspace</span> `;
                          Icon($$payload7, {
                            icon: iconIds.addIcon,
                            width: "1.25rem",
                            class: "text-neutral-10"
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                } else {
                  $$payload5.out += "<!--[!-->";
                }
                $$payload5.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        if (workspaceContext.id) {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<!---->`;
          Menu($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->`;
              Menubar_trigger($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Select`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> <!---->`;
              Menubar_content($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Group($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Menubar_group_heading($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Tools`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> <!---->`;
                      Menubar_item($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Button($$payload7, {
                            class: "flex h-full w-full items-center justify-between",
                            children: ($$payload8) => {
                              $$payload8.out += `<span>Pointer</span> `;
                              Icon($$payload8, {
                                icon: iconIds.pointerSelectIcon,
                                width: "1.25rem",
                                class: "text-neutral-10"
                              });
                              $$payload8.out += `<!---->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> <!---->`;
                      Menubar_item($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Button($$payload7, {
                            class: "flex h-full w-full items-center justify-between",
                            children: ($$payload8) => {
                              $$payload8.out += `<span>Group</span> `;
                              Icon($$payload8, {
                                icon: iconIds.groupSelectIcon,
                                width: "1.25rem",
                                class: "text-neutral-10"
                              });
                              $$payload8.out += `<!---->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <!---->`;
                  Group($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Menubar_group_heading($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Planting Areas`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      {
                        $$payload6.out += "<!--[!-->";
                        $$payload6.out += `<!---->`;
                        Menubar_item($$payload6, {
                          children: ($$payload7) => {
                            $$payload7.out += `<span class="italic">None</span>`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!---->`;
                      }
                      $$payload6.out += `<!--]-->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          if (gardenContext.authorize("WorkspaceEdit")) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<!---->`;
            Menu($$payload3, {
              children: ($$payload4) => {
                $$payload4.out += `<!---->`;
                Menubar_trigger($$payload4, {
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->Edit`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----> <!---->`;
                Menubar_content($$payload4, {
                  children: ($$payload5) => {
                    if (workspaceContext.editing) {
                      $$payload5.out += "<!--[-->";
                      $$payload5.out += `<!---->`;
                      Menubar_item($$payload5, {
                        children: ($$payload6) => {
                          $$payload6.out += `<!---->`;
                          Button($$payload6, {
                            class: "flex h-full w-full items-center justify-start",
                            onclick: () => {
                              workspaceContext.editing = false;
                            },
                            children: ($$payload7) => {
                              Icon($$payload7, {
                                icon: iconIds.endEditingIcon,
                                width: "1.25rem",
                                class: "text-neutral-11 mr-2"
                              });
                              $$payload7.out += `<!----> <span>End Editing</span>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload6.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload5.out += `<!----> <!---->`;
                      Menubar_item($$payload5, {
                        children: ($$payload6) => {
                          $$payload6.out += `<!---->`;
                          Button($$payload6, {
                            class: "flex h-full w-full items-center justify-start",
                            onclick: () => {
                              toolbox.activate("translate");
                            },
                            children: ($$payload7) => {
                              Icon($$payload7, {
                                icon: iconIds.verdagraphTranslateIcon,
                                width: "1.25rem",
                                class: "text-neutral-11 mr-2"
                              });
                              $$payload7.out += `<!----> <span>Translate</span>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload6.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload5.out += `<!----> <!---->`;
                      Menubar_item($$payload5, {
                        class: "flex items-center justify-start",
                        children: ($$payload6) => {
                          Icon($$payload6, {
                            icon: iconIds.deleteIcon,
                            width: "1.25rem",
                            class: "text-neutral-11 mr-2"
                          });
                          $$payload6.out += `<!----> <span>Delete</span>`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload5.out += `<!---->`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                      $$payload5.out += `<!---->`;
                      Menubar_item($$payload5, {
                        children: ($$payload6) => {
                          $$payload6.out += `<!---->`;
                          Button($$payload6, {
                            class: "flex h-full w-full items-center justify-start",
                            onclick: () => {
                              workspaceContext.editing = true;
                            },
                            children: ($$payload7) => {
                              Icon($$payload7, {
                                icon: iconIds.startEditingIcon,
                                width: "1.25rem",
                                class: "text-neutral-11 mr-2"
                              });
                              $$payload7.out += `<!----> <span>Start Editing</span>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload6.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload5.out += `<!---->`;
                    }
                    $$payload5.out += `<!--]-->`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (workspaceContext.editing) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<!---->`;
            Menu($$payload3, {
              children: ($$payload4) => {
                $$payload4.out += `<!---->`;
                Menubar_trigger($$payload4, {
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->Add`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----> <!---->`;
                Menubar_content($$payload4, {
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->`;
                    Menubar_item($$payload5, {
                      children: ($$payload6) => {
                        $$payload6.out += `<!---->`;
                        Button($$payload6, {
                          class: "flex h-full w-full items-center justify-between",
                          onclick: () => {
                            toolbox.activate("plantingAreaCreate");
                          },
                          children: ($$payload7) => {
                            Icon($$payload7, {
                              icon: iconIds.plantingAreaIcon,
                              width: "1.25rem",
                              class: "text-neutral-11"
                            });
                            $$payload7.out += `<!----> <span>Add Planting Area</span>`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload5.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <!---->`;
          Menu($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->`;
              Menubar_trigger($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->View`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> <!---->`;
              Menubar_content($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Group($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Menubar_checkbox_item($$payload6, {
                        disabled: !workspaceContext.layoutEnabled,
                        get checked() {
                          return workspaceContext.treeEnabled;
                        },
                        set checked($$value) {
                          workspaceContext.treeEnabled = $$value;
                          $$settled = false;
                        },
                        children: ($$payload7) => {
                          $$payload7.out += `<div class="flex w-full items-center justify-between"><span>Tree</span> `;
                          Icon($$payload7, {
                            icon: iconIds.verdagraphTreeIcon,
                            width: "1rem"
                          });
                          $$payload7.out += `<!----></div>`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> <!---->`;
                      Menubar_checkbox_item($$payload6, {
                        disabled: !workspaceContext.treeEnabled,
                        get checked() {
                          return workspaceContext.layoutEnabled;
                        },
                        set checked($$value) {
                          workspaceContext.layoutEnabled = $$value;
                          $$settled = false;
                        },
                        children: ($$payload7) => {
                          $$payload7.out += `<div class="flex w-full items-center justify-between"><span>Layout</span> `;
                          Icon($$payload7, {
                            icon: iconIds.verdagraphLayoutIcon,
                            width: "1rem"
                          });
                          $$payload7.out += `<!----></div>`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      if (workspaceContext.layoutEnabled && workspaceContext.treeEnabled) {
                        $$payload6.out += "<!--[-->";
                        $$payload6.out += `<!---->`;
                        Sub($$payload6, {
                          children: ($$payload7) => {
                            $$payload7.out += `<!---->`;
                            Menubar_sub_trigger($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->Direction`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> <!---->`;
                            Menubar_sub_content($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->`;
                                RadioGroup($$payload8, {
                                  get value() {
                                    return workspaceContext.contentPaneDirection;
                                  },
                                  set value($$value) {
                                    workspaceContext.contentPaneDirection = $$value;
                                    $$settled = false;
                                  },
                                  children: ($$payload9) => {
                                    $$payload9.out += `<!---->`;
                                    Menubar_radio_item($$payload9, {
                                      value: "horizontal",
                                      children: ($$payload10) => {
                                        $$payload10.out += `<!---->Horizontal`;
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$payload9.out += `<!----> <!---->`;
                                    Menubar_radio_item($$payload9, {
                                      value: "vertical",
                                      children: ($$payload10) => {
                                        $$payload10.out += `<!---->Vertical`;
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$payload9.out += `<!---->`;
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!---->`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!---->`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!---->`;
                      } else {
                        $$payload6.out += "<!--[!-->";
                      }
                      $$payload6.out += `<!--]-->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <!---->`;
                  Menubar_separator($$payload5, {});
                  $$payload5.out += `<!----> <!---->`;
                  Menubar_item($$payload5, {
                    onclick: () => {
                      toolbox.activate("layoutConfig");
                    },
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Layout Config`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]-->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    children($$payload2);
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
export {
  _layout as default
};
