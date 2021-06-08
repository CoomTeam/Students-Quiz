<x-layout>

	<div class="card-body">
		<div class="container-card">

			@foreach ($results as $result)
			<div class="card">
				<div class="banner" style="background-image: url({{$result->url}})"></div>
				<h2 class="name">{{$result->name}}</h2>
					<div class="desc">
						<p>
							{{$result->description}}
						</p>
					</div>
				</div>
			@endforeach
		</div>
	</div>

</x-layout>