import { useRouter } from "next/navigation";

type RouterType = ReturnType<typeof useRouter>;

export function redirectByRole(role: string, router: RouterType) {
  if (role === "teacher") {
    router.push("/client/teacherDashboard");
  } else {
    router.push("/client/studentDashboard");
  }
}
