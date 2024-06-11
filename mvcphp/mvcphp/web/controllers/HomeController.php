<?php 
    require_once WEB_ROOT . '/services/PositionService.php';
    require_once WEB_ROOT . '/services/MenusService.php';
    class HomeController{
        public function index(){
            $MenusService = new MenusService();
            $getMenus = $MenusService->getallMenus();
            
            include WEB_ROOT . '/views/home/index.php';
            
        }
        
    }   

?>