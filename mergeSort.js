

// Javascript program in-place Merge Sort

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
// Inplace Implementation
var delay_time = 10;
var c_delay = 0;
let HEIGHT_MULTIPLIER = 5;

function setMultiplier(){
	let height = window.innerHeight;
	HEIGHT_MULTIPLIER = height/100 * 0.55;
}
function barUpdate(bar, height, color)
{

    window.setTimeout(
        function(){
            bar.style = "height:"+ height + "px;" + "background-color:" + color + ";" + "margin : 0 2px;";
        },c_delay+=delay_time
    )
}
function merge(arr, start, mid, end, bars)
{
	let start2 = mid + 1;

	// If the direct merge is already sorted
	if (arr[mid] <= arr[start2])
	{ 
		return;
	}

	// Two pointers to maintain start
	// of both arrays to merge
	while (start <= mid && start2 <= end)
	{
		
		// If element 1 is in right place
		if (arr[start] <= arr[start2])
		{
			barUpdate(bars[start],arr[start]*HEIGHT_MULTIPLIER,"yellow")
			start++;
		}
		else
		{
			
			let value = arr[start2];
			let index = start2;

			// Shift all the elements between element 1
			// element 2, right by 1.
			while (index !== start)
			{
				arr[index] = arr[index - 1];
				barUpdate(bars[index], arr[index-1]*HEIGHT_MULTIPLIER , "green")
				index--;
			}
			arr[start] = value;
			barUpdate(bars[start], value*HEIGHT_MULTIPLIER, "green")
			// Update all the pointers
			start++;
			mid++;
			start2++;
			
		}
	}
	
}

/* l is for left index and r is right index
of the sub-array of arr to be sorted */
function mergeSort(arr, l, r, bars)
{
	if (l < r)
	{
		
		// Same as (l + r) / 2, but avoids overflow
		// for large l and r
		let m = l + Math.floor((r - l) / 2);

		// Sort first and second halves
		mergeSort(arr, l, m, bars);
		mergeSort(arr, m + 1, r, bars);

		merge(arr, l, m, r, bars);
		var i = l;
		while(i<r)
		{
		barUpdate(bars[i],arr[i]*HEIGHT_MULTIPLIER, "blue")
		i++;
		}
	}
}
export const mergeSortHelper = array =>
{
	setMultiplier()
    let bars = document.getElementsByClassName("array-bar")
    mergeSort(array, 0 , array.length, bars)
	return array;
}
