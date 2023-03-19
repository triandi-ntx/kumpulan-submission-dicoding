#menampilkan memory
while true
do
 free -m
 sleep 3

#menampilkan ukuran disk
 df -BG
 sleep 3

#menampilkan file system dan Use%
 df -h | grep -v tmpfs | awk '{print $1 " " $5}'
 sleep 1m
done
