<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\news;

class newsController extends Controller
{
    //

    function select(){

        return news::orderBy('Id', 'DESC')->get();

    }
    function save(Request $request){
        
        $title = $request->title;
        $body =  $request->body;

        $add = DB::table("news")->insert([
            'title' => $title,
            'body' => $body
        ]);
        
        if($add){
            return news::orderBy('Id', 'DESC')->get();
        }
    }

    function delete(Request $request){
        $id = $request->id;

        $del = DB::table("news")->where('id', $id)->delete();

        if($del){
            return news::orderBy('Id', 'DESC')->get();
        }
    }

    function update(Request $request){
        $id = $request->id;
        $title = $request->title;
        $body =  $request->body;

        // var_dump($request);
        $del = DB::table("news")->where('id', $id)->update([
            'title' => $title,
            'body' => $body
        ]);

        if($del){
            return news::orderBy('Id', 'DESC')->get();
        }
    }
    
}
