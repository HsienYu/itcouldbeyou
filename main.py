import pytchat
import time
chat = pytchat.create(video_id="xL0ch83RAK8")
while chat.is_alive():
    for c in chat.get().sync_items():
        print(f"{c.datetime} [{c.author.name}]- {c.message}", flush=True)
