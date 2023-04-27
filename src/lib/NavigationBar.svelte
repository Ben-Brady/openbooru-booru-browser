<nav>
	<a href="/" title="Home">
		<img src="/images/home.svg" alt="Home" height="32" width="32" />
		<span>
			Home
		</span>
	</a>
	<a href="/info" title="Info">
		<img src="/images/info.svg" alt="Info" height="32" width="32" />
		<span>
			Info
		</span>
	</a>
</nav>

<style lang="scss">
	nav {
		position: sticky;
		float: left;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100%;
		z-index: 1;

		background-color: var(--BACKGROUND-2);
		outline: black .1rem solid;
		outline-width: 0 .1rem 0 0;

		/* Grid */
		display: flex;
		gap: .5rem;
		flex-direction: column;
		align-items: center;
		padding-top: .2rem;

		transition: 200ms ease-in-out;

		&:hover {
			width: 10rem;
			padding-left: .2rem;
			padding-right: .2rem;
		}
	}


	a {
		/* Shape */
		height: 2rem;
		width: 100%;

		/* Center containinng items */
		display: flex;
		gap: 1rem;
		align-items: center;
		padding-left: .2rem;
		transition: 0.2s ease-in-out;
		box-sizing: border-box;

		nav:hover & {
			cursor: pointer;
			padding-left: .2rem;
			padding-right: .2rem;

			border-radius: 1rem;
		}

		&:hover {
			background-color: var(--BACKGROUND-3-HOVER);
		}
	}

	span {
		font-size: 1.3rem;
		color: black;
		text-decoration: none;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		transition: 0.2s ease-in-out;
		a:hover & {
			filter: invert(90%);
		}

		display: none;
		nav:hover & {
			display: block;
		}
	}

	img {
		height: 1.5rem;
		width: 1.5rem;
		position: relative;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
