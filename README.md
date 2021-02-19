# jsCollector

This was my MVP project at Hack Reactor. Similar to a hack-a-thon, I had 16 hours to plan and implement a novel piece of software.

And here is jsCollector. A tool designed to help move the community of overclocking to a more collaborative level, while solving a three big issues we have faced since I overclocked my first Pentium 75 in the mid 90s to my last Haswell-E a few years ago.

jsCollector is a docker based NodeJS host which can be run on Amazon EC2 free tier instances. It comes along with a client NodeJS application that runs on a Raspberry Pi which is then wired to the i2c bus on your motherboard. I think it will run on any pi, using node v10. I used a Pi 3b+ that I had left over from my last 3d printer project. And the final component is a database which the backend uses to catalog large amounts of samples.

# Overview of the problems

The first problem is that people attempt overclock their computers with the same settings they get from the internet and see widely different results. This is usually attributed to the silicon lottery, where you just get lucky and happen to purchase hardware that has been binned down or only slightly ran out of specification at higher speeds.

The second reason I have seen over the years is the complexity added by continually more advanced processor power management schemas. Over my fifteen years of PC overclocking the most common advice is that you must turn off all power management features in order to ensure stability. In my experience, this makes running high tier overclocking riskier and causes excess power usage.

The final issue is the proprietary implementations of power management and “auto” settings provided by motherboard manufacturers. I want to reveal what is actually happening between different board designs and help make sense of why certain boards are good performers while others fall flat.

# Some solutions I came up with

I feel the community has been over-simplifying the problem because of a lack of analytics on working setups. I think there is a fatal drawbacks to the current system monitoring tools: They are all software based. These tools often only log every few seconds and can rarely retain their logs in the event of a system crash.

Also, I think it is really important to analyze what is happening during the most frequent points of overclocking instability, that is during POST process, at extreme load and heavy idle scenarios. Host software, by its very nature, cannot do this.

One other problem I would like to address is that monitoring tools often influence the data they collect by causing CPU wakeups, memory usage and disk writes. Simply having these tools active on your system reduces your computer’s ability to go in to a deep idle state, contributing to the tendency to turn off CPU power management settings.

So, I wanted to be able to collect statistics without any load on the CPU, without any software, all while collecting a massive amount more data points.

# My implementation

In my own experience, I have been able to retain CPU and memory power management features by monitoring the i2c bus and influencing conditions that resulted in instability. This remains a niche in overlocking.

By using i2c bus data and fine tuning voltage offsets, per core multipliers, and VRM phases I have been able to enjoy high tier overclocking results without the pain of extreme cooling, greatly increased power consumption and instability.

So with 16 hours to code, I set out to address these problems with the following constraints.

# Project constraints

-	Must not influence the data it collects by putting a load on the machine.
-	Collect data without concern for the current state of the operating system.
-	Collect at least 500 data points per second.
-	Be scalable to allow for big data analysis.
-	Cost less than $50 in hardware.

And here is the result of that effort.

# Reflections on my work
-	I focused much of my effort in writing a promise based Websockets router, getting the router horizontally scale, and developing the formulas to convert the i2c in to usable data. The final four hours were spent writing the frontend.
-	The front end is very basic but is functionally able to display an extremely large amount of samples per second.
-	I wanted to explore Vue.js, so I switched over to it after writing the skeleton front end in Next.js. Next is really easy to work with and I was looking for something more challenging, since I had never programmed in Vue before.
-	I would like to do the frontend in both Vue and React to compare their performance and complexity when dealing with thousands of samples per second.
-	I worked with MySQL for its ability to specify custom data types, but actually found MongoDB to perform better in my final testing. So, I yanked out the MySQL portion in the final hours.
-	I had the pi server running in docker to analyze performance, but to save time I cut a corner by testing performance on the pi itself. As a result, the pi docker module does not work properly. The PI 3b+ I used performed much better than I expected, generating only 3% CPU load with 500 samples per second streaming over the wifi.


