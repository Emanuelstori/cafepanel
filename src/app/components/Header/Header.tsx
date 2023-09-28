"use client";
//header
import { Button } from "@nextui-org/button";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { IoNotifications } from "react-icons/io5";
import { MdFeedback } from "react-icons/md";

export default function Header() {
  const { data: session, status, update } = useSession() || {};
  if (status === "authenticated") {
    console.log(session.user?.name);
    return (
      <>
        <div className="fixed flex items-center justify-end w-full left-0 top-0 h-16 bg-[#070720]">
          <div className="flex items-center justify-center gap-2 px-6">
            <Popover placement="bottom" offset={20} showArrow={true}>
              <PopoverTrigger>
                <Button className="bg-transparent p-2 w-fit min-w-fit h-fit rounded hover:bg-[#444444]">
                  <MdFeedback />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Popover Content</div>
                  <div className="text-tiny">This is the popover content</div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover placement="bottom" offset={20} showArrow={true}>
              <PopoverTrigger>
                <Button className="bg-transparent p-2 w-fit min-w-fit h-fit rounded hover:bg-[#444444]">
                  <IoNotifications />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Popover Content</div>
                  <div className="text-tiny">This is the popover content</div>
                </div>
              </PopoverContent>
            </Popover>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${session.user?.name}&direction=3&head_direction=3&size=l&headonly=1`}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{session.user?.name}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </>
    );
  }
}
