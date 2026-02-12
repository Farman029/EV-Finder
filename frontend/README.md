In this version i corrected 
 first implemented react hot toast popup 
  and 
  corrected addstation route 
   usme frontend galat route pe  req bhej rha hai 


<!--  -->
makig ui beteer cards me shadow and round kiya 
font inlcude kiya h index.css me 

<!--  -->

filhal kuch kamiyan hai
like user past date ki booking kar skta hai
and am pm timing ka kuch pata nahi
and 
owner hai to usme my stations honi chahiye  na ki bookings 
and user vechicer owner hai to usme my bookings honi chahiye 




status ka kya karna hai kuch pata nahi 

abhi tak ye correct work kr rha hai login logout add station etc


in this version 
4 and above 
ui change status theek and footer add kiya hai 
and bs hume jwt token ka time  zayada din tak valid rakhna hoga pehle 1 hour tha ab 10d kr diya hai 


footer jo ki home.jsx me hai jb ek bhi stations nahi the toh wo center pr aa gya 
 so home div me flex flex col kr diya 
 and flex grow  div me jisme cards hai booking wale


 now ab ise cloud mongo db se connect krte hai 
 
 isme humne validations lagai hai 
  like frontend me koi bhi 50 se zyada and 8 se kam nahi 
  backend me humne 8,3000 ki password limit set ki hai 

  now our frontend part is almost complete but ek cheez hai 
   jese agar koi station owner hai to use profile me uske created stations dikhenge 
   and us station ki bookings show hongi and jb koi 
   


i have fix all of this now vehicle user has its mybookings right

station owner has  owner dashboard 
in menu 
vehicle ->get  my bookings
owner -->get my stations
 and in each station the has other listings 
 <!--  ye saari cheeze fixed kr di hai  -->

 <!-- ab bas geolocation wala feature  implement karna hai  -->
 now abb wo  bhi kar diya hai  station create krne time uski geolocation bhi save hota hai 
 asks fo rlocation  if we allow it then it takes

 now everything is fine  but i want somthing different 
 ye version old thinking ke hisaab se sahi bani hai

 old thinking -> users me owner and vehicle user  honge 
 station owner stations create karega  jo  owner se link honge 
 and each stations pe kitni bookings  hai wo bhi dikh jayga 

dikkat  ye hai ki delhi me bhot sare parking and charging stations hai hume sbke pas ja kr register karwana  padega  jo ki  bug hai 



ab me kya soch rha hu ki 
api ka use karke data fetch krta hu charging stations ki 
 and use display karenge home page par


 and stations do type ki hongi 
 1 jinka  owner hoga jo register krenge wohi 
2 jo api se aayengi and  display hongi 


pehle ek simple sa project banana  hai and then sochenge 

 book krne par stations book ho jayengi 
  and use apne my bookings me check kr sakta hai 


<!--  in this project version 8 everything is working fine  -->
 
what i want :-


1 station schema change 
take full address from user 

 wo kam ho gya ab uski zaroorat nahi hai


 and 

 now search bar create kara hai 
 
 home page ko empy kara hai and 
 find stations me sare stations milenge


 search bar ko working banana hai 
 