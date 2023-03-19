#menampilkan memory
while true
do
#menampilkan ukuran disk
 journalctl --disk-usage
 sleep 3
 
#menghapus dan membatasi ukuran journalctl hanya 10MB
 journalctl --vacuum-size=10M
 sleep 5

#menampilkan ukuran disk kembali
 journalctl --disk-usage
 sleep 30
 
done
