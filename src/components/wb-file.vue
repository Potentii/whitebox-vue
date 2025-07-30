<template>
	<div class="wb-file">

		<img
			class="-image -content"
			v-if="mediaType === 'image'"
			crossorigin="use-credentials"
			:src="mediaUrl"/>

		<video
			class="-video -content"
			v-else-if="mediaType === 'video'"
			crossorigin="use-credentials"
			:controls="!previewMode"
			preload="metadata"
			:src="mediaUrl"
			ref="video"
			:playsinline="previewMode"
			:muted="previewMode"
			@mouseenter="content_onmouseenter($event, 'video')"
			@mouseleave="content_onmouseleave($event, 'video')"
			loop>
		</video>

<!--		<span class="-unset -content" v-else-if="!src"></span>-->

		<span class="-document -content" v-else>
			<wb-icon class="-icon">docs</wb-icon>
		</span>

	</div>
</template>


<script>
/**
 * @typedef {'use-credentials'|'anonymous'} WbFileCrossorigin
 */
/**
 * @typedef {'video'|'image'|'document'} WbFileType
 */

import WbIcon from "./wb-icon.vue";

export default {

	name: 'wb-file',

	components: {WbIcon},

	props: {
		/**
		 * @type {?string}
		 */
		src: {
			type: String,
			required: false
		},


		/**
		 * @type {?boolean}
		 */
		previewMode: {
			type: Boolean,
			required: false
		},


		/**
		 * @type {?File}
		 */
		file: {
			type: File,
			required: false,
		},


		/**
		 * @type {?WbFileCrossorigin}
		 */
		crossorigin: {
			type: String,
			required: false,
			validate: val => ['use-credentials','anonymous'].includes(val),
		},

		/**
		 * @type {?WbFileType}
		 */
		type: {
			type: String,
			required: false,
			validator(value) {
				return ['video', 'image', 'document'].includes(value);
			}
		},


	},



	data(){
		return {
			intervalId: null,
		}
	},


	computed: {

		mediaUrl() {
			if(this.src){
				return this.src;
			} else if(this.file){
				return URL.createObjectURL(this.file)
			}
		},


		/**
		 *
		 * @return {?WbFileType}
		 */
		mediaType() {
			if(this.type)
				return this.type;

			if(!this.src && !this.file)
				return null;

			if(this.src){
				const extension = /\.(.+)$/.exec(this.src)?.[1];
				if (/^(svg|png|jpg|jpeg|gif|webp)$/i.test(extension))
					return 'image';
				if (/^(mp4|mpeg|mpg|mov|wmv|flv|avi|ts|webm)$/i.test(extension))
					return 'video';
			} else if(this.file){
				const mime = this.file.type;
				if (mime?.includes('image'))
					return 'image';
				if (mime?.includes('video'))
					return 'video';
			}

			return 'document';
		},


		/**
		 * @return {?HTMLVideoElement}
		 */
		videoEl(){
			return this.mediaType === 'video' ? this.$refs[this.mediaType] : null;
		},

	},


	mounted() {
		if(this.mediaType === 'video'){

			const video = this.videoEl;

			const onloadmetadata = e => {
				video.currentTime = video.duration * 0.3;
				video.removeEventListener('loadedmetadata', onloadmetadata);
			};

			video.addEventListener('loadedmetadata', onloadmetadata);
		}
	},


	methods: {

		/**
		 * @param {MouseEvent} e
		 */
		async content_onmouseenter(e) {
			if(!this.previewMode)
				return;

			if(this.mediaType !== 'video')
				return;

			if(this.intervalId)
				return;

			const video = this.videoEl;

			try {
				await video.play();
			} catch (err){
			}

			this.intervalId = setInterval(() => {
				video.currentTime += video.duration / 15;
			}, 700);

		},


		/**
		 * @param {MouseEvent} e
		 */
		content_onmouseleave(e) {
			if(!this.intervalId)
				return;

			const video = this.videoEl;

			if(this.intervalId){
				clearInterval(this.intervalId);
				this.intervalId = null;
			}

			video.pause();
			video.currentTime = video.duration * 0.3;
		}
	},


}
</script>


<style>


@property --wb-file--object-fit {
	syntax: "*";
	inherits: true;
	initial-value: cover;
}


.wb-file {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.wb-file > .-content {
	display: block;
	height: 100%;
	width: 100%;
}

.wb-file > .-image.-content {
	object-fit: var(--wb-file--object-fit);
	object-position: center center;
}

.wb-file > .-video.-content {
}

.wb-file > .-document.-content {
	opacity: 0.8;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;
}

</style>
