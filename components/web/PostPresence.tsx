"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import FacePile from "@convex-dev/presence/facepile";
import usePresence from "@convex-dev/presence/react";
import { useConvexAuth, useQuery } from "convex/react";

interface iAppProps {
    roomId: Id<"posts">;
}

// 1. 父组件：专门负责“查户口”（获取 userId 并处理 Loading）
export function PostPresence({ roomId }: iAppProps) {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const userId = useQuery(api.presence.getUserId, isAuthenticated ? {} : "skip");

    // ✅ 这里的提前 return 是安全的，因为父组件下面已经没有任何 Hook 了
    if (isLoading || !userId) return null;

    // 获取到合法的 userId 后，再把工作交接给子组件
    return <ActivePresence roomId={roomId} userId={userId} />;
}

// 2. 子组件：专门负责“在线状态”（无条件执行 Hook）
function ActivePresence({ roomId, userId }: { roomId: Id<"posts">, userId: string }) {
    // ✅ 这里的 Hook 每次都会被 100% 毫无条件地执行，完美符合 Rules of Hooks
    const presenceState = usePresence(api.presence, roomId, userId);

    if (!presenceState || presenceState.length === 0) {
        return null;
    }

    return (
        <div className="flex items-center gap-2">
            <p className="text-x5 uppercase tracking-wide text-muted-foreground">
                Viewing now
            </p>
            <div>
                <FacePile presenceState={presenceState ?? []} />
            </div>
        </div>
    );
}