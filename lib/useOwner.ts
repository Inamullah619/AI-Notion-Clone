import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { where, query, collectionGroup } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

function useOwner() {
  const { user } = useUser();
  const room = useRoom();
  const [isOwner, setIsOnwer] = useState(false);
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id)),
  );
  useEffect(() => {
    if (usersInRoom?.docs && usersInRoom.docs.length > 0) {
      const owner = usersInRoom.docs.filter(
        (doc) => doc.data().role === "owner",
      );
      if (
        owner.some(
          (owner) => owner.data().userId === user?.emailAddresses[0].toString(),
        )
      ) {
        setIsOnwer(true);
      }
    }
  }, [usersInRoom, user]);
  return isOwner
}

export default useOwner;
