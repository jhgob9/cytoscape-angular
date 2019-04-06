import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleService } from 'src/app/services/subtitle.service';
import { ajax } from 'rxjs/ajax';

declare function removePopper(): any;

@Component({
  selector: 'app-performance-tuning',
  templateUrl: './performance-tuning.component.html',
  styleUrls: ['./performance-tuning.component.css']
})
export class PerformanceTuningComponent implements OnInit {
  public cy: any;

  constructor(
	public SubTitle: SubtitleService,
	private http: HttpClient
  ) { }

	ngOnInit() {
		removePopper();
		this.SubTitle.subtitle = 'Performance tuning';
		const cyFn = () => {
			const dataGet$ = ajax.getJSON('./assets/performance-tuning/data.json');
			dataGet$.subscribe(data => {
				this.cy = cytoscape({
					// these options hide parts of the graph during interaction
					// hideEdgesOnViewport: true,
					// hideLabelsOnViewport: true,

					// this is an alternative that uses a bitmap during interaction
					// textureOnViewport: true,

					// interpolate on high density displays instead of increasing resolution
					// pixelRatio: 1,

					// a motion blur effect that increases perceived performance for little or no cost
					// motionBlur: true,
					container: document.getElementById('cyPerformance'),
					style: cytoscape.stylesheet()
						.selector('node')
						.css({
							width: 'mapData(weight, 0, 100, 10, 60)',
							height: 'mapData(weight, 0, 100, 10, 60)'
						})
						.selector('edge')
						.css({
							opacity: '0.333',
							width: 'mapData(weight, 0, 100, 1, 6)',
							'curve-style': 'haystack' // fast edges!
						}),
					layout: {
						name: 'concentric',
						concentric: (ele: any) => ele.data('weight'),
						levelWidth: nodes => 10,
						padding: 10
					},
					elements: data
				});
			});
		};
		cyFn();
	}
}
